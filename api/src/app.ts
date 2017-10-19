import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as cors from 'cors';
import * as expressValidator from 'express-validator';
import * as compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './lib/errors';
import { handleError } from './utils';

const router = require('./routes/router');
const app: express.Application = express();
app.use(bodyParser.json()); 
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(expressValidator());
app.use(logger('dev'));

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

router(app);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(res, err);
});

module.exports = app;