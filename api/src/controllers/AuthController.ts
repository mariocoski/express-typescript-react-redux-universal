import { Request, Response } from 'express';
import { EMAIL_IS_REQUIRED, INVALID_PASSWORD_RESET_TOKEN, EXPIRED_PASSWORD_RESET_TOKEN } from '../constants/errors';
import { PASSWORD_CHANGE_SUCCESS } from '../constants/messages';
import { USER_ROLE } from '../constants/roles';
import { getErrors, formatError, generateResetPasswordToken } from '../utils'
import * as filter from 'express-validator/filter';
import * as db from '../models';
import { env, generateToken, catchErrors, getRoleId, generateHash } from '../utils';
import { sendEmail } from '../utils/mail';
import { EMAIL_ALREADY_IN_USE,USER_NOT_FOUND } from '../constants/errors';
import { ONE_HOUR } from '../constants';
import { findUserByEmail, createUser, findUserByToken } from '../repositories/userRepo'; 
import { associateRole } from '../repositories/roleRepo';
import * as crypto from 'crypto';
import config from '../config/main';
import * as mailgunService from "mailgun-js";
const mailgun: Mailgun.Mailgun = mailgunService({apiKey: config.mailgun_api_key, domain: config.mailgun_domain});

const register = catchErrors(async (req: Request, res: Response) => {

  const errors = getErrors(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const data: any = filter.matchedData(req);

  const user = await findUserByEmail(data.email);

  if(user){  
    return res.status(422).json(formatError(EMAIL_ALREADY_IN_USE));
  }

  const createdUser = await createUser(data);
  const userModel = createdUser.get({ plain: true });
  await associateRole(userModel.id, getRoleId(USER_ROLE));

  const userInfo = {
    _id: userModel.id,
    first_name: userModel.first_name,
    last_name: userModel.last_name,
    email: userModel.email,
    roles: [USER_ROLE]
  }

  res.status(201).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
});

const login =  catchErrors(async (req: Request, res: Response) => {

  const user = req.user;
  const userToBeUpdated = await findUserByEmail(user.email);
  
  await userToBeUpdated.update({
    password_reset_token : null,
    password_reset_token_expired_at: null
  });

  const userInfo = {
    _id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    roles: [USER_ROLE]
  }

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
});

const forgotPassword = catchErrors(async (req: Request, res: Response) => {

  const errors = getErrors(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const data: any = filter.matchedData(req);

  const user = await findUserByEmail(data.email);
  
  if(! user){  
    return res.status(422).json(formatError(USER_NOT_FOUND));
  }

  const token: string = await generateResetPasswordToken();
  
  await user.update({
    password_reset_token: token,
    password_reset_token_expired_at: Date.now() + ONE_HOUR
  });
  const mailData:Mailgun.messages.SendData= {
    from: 'NoReply<user@smtp.mailgun.org>',
    to: user.email,
    subject: 'Reset Password',
    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://'}${req.headers.host}/reset-password/${token}\n\n` +
    `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  await sendEmail(mailData,mailgun);

  res.json({message: 'Please check your email for the link to reset your password'});
});  

const resetPassword = catchErrors(async (req: Request, res: Response) => {
  
    const errors = getErrors(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
  
    const data: any = filter.matchedData(req);
  
    const user = await findUserByToken(data.token);

    if(! user){
      return res.status(422).json(formatError(INVALID_PASSWORD_RESET_TOKEN));
    }
    if(user.password_reset_token !== data.token){
      return res.status(422).json(formatError(INVALID_PASSWORD_RESET_TOKEN));
    }
    var olderThanOneHour = 
      (Date.now() - (new Date(user.password_reset_token_expired_at).getTime())) > ONE_HOUR; 
      
    if(olderThanOneHour){
      return res.status(422).json(formatError(EXPIRED_PASSWORD_RESET_TOKEN));
    }

    await user.update({
      password_reset_token: null,
      password_reset_token_expired_at: null,
      password : await generateHash(data.password)
    });

    const mailData:Mailgun.messages.SendData= {
      from: 'NoReply<user@smtp.mailgun.org>',
      to: user.email,
      subject: 'Password Changed',
      text: `You are receiving this email because you changed your password.\n\n
      'If you did not request this change, please contact us immediately.`
    };
  
    await sendEmail(mailData,mailgun);

    res.status(200).json({message: PASSWORD_CHANGE_SUCCESS});
  })

export {
  login,
  register,
  forgotPassword,
  resetPassword
};

// function roleAuthorization (requiredRole) {
//   return function (req, res, next) {
//     const user = req.user;

//     User.findById(user._id, (err, foundUser: any) => {
//       if (err) {
//         res.status(422).json({ error: 'No user was found.' });
//         return next(err);
//       }

//       // If user is found, check role.
//       if (getRole(foundUser.role) >= getRole(requiredRole)) {
//         return next();
//       }

//       return res.status(401).json({ error: 'You are not authorized to view this content.' });
//     });
//   };
// };
