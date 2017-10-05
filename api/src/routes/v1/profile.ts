import { Router } from 'express';
import { ProfileController } from '../../controllers';
import * as passport from 'passport';
import {isAuthorized} from '../../utils';
import {ROLE_USER} from '../../constants/roles';
import {handleError} from '../../utils';

const requireAuth = (req,res, next) => {
  passport.authenticate(['jwt','local'], { session: false }, (err, user) => {
    if(err) return handleError(res,err);
    req.user = user;
    return next();
  });
}

const router: Router = Router();

router
  .get('/:id',requireAuth, isAuthorized(ROLE_USER), ProfileController.show);

export default router;
