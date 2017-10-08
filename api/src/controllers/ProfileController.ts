import {Request, Response } from 'express';
// import {User} from '../models/user';

function show(req: Request, res: Response){
  // const user = req.user;
  // if(req.params.id.toString() !== user._id.toString()){
  //   res.status(401).json({error: "You are not authorized to see this resource"});
  //   return;
  // }
  res.send("ok");
  // return User.findById(user._id, (err, foundUser: any) => {
  //   if (err) {
  //     return res.status(422).json({ error: 'No user was found.' });
  //   }
  //   return res.json({email: foundUser.email});
  // });
}

function update(req: Request, res: Response){
  res.json({updated: true});
}

export default {
  show,
  update
};

