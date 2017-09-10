import ProfileRouter from './profile';
import {PROFILE_ROUTE  } from '../../constants/routes';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/',(req:Request, res:Response)=>{
  res.send('ok');
});

router.use(PROFILE_ROUTE, ProfileRouter);

export default router;