import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';
import {findUserByEmail,updateUser} from '../repositories/userRepo';
import {UnauthorizedError} from '../lib/errors';
import * as filter from 'express-validator/filter';

const show = catchErrors(async (req: Request, res: Response) => {

  const user = req.user;

  if(user.id.toString() !== req.params.userId){
    throw new UnauthorizedError();
  }

  const userData = await findUserByEmail(user.email);
  
  const userInfo = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    bio: userData.bio,
    verified:  userData.verified,
    created_at:  userData.createdAt,
    updated_at:  userData.updatedAt,
    roles: userData.roles
  };

  res.status(200).send(userInfo);
});

const update = catchErrors(async (req: Request, res: Response) => {
  
  const user = req.user;

  if(user.id.toString() !== req.params.userId){
    throw new UnauthorizedError();
  }

  const errors = getErrors(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const data: any = filter.matchedData(req);

  await updateUser(user.id, data);

  res.status(200).json({ updated: true});
});

export {
  show,
  update
};

