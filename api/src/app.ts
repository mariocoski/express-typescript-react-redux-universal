
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as cors from 'cors';
import * as expressValidator from 'express-validator';

const router = require('./routes/router');
const app: express.Application = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(expressValidator());
app.use(logger('dev'));

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

router(app);


module.exports = app;