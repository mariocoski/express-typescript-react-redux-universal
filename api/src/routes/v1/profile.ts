import { Router } from 'express';
import { ProfileController } from '../../controllers';
import * as passport from 'passport';
import {isAuthorized} from '../../utils';
import {ROLE_USER} from '../../constants/roles'
const requireAuth = passport.authenticate('jwt', { session: false });

const router: Router = Router();

router
  .get('/:id',requireAuth, isAuthorized(ROLE_USER), ProfileController.show);

export default router;