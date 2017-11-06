import {Request, Response } from 'express';
import {catchErrors,getErrors,formatError} from '../utils';
import {findUserByEmail} from '../repositories/userRepo';

const show = catchErrors(async (req: Request, res: Response) => {

  const user = req.user;
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
  
   

});
export {
  show,
  update
};

