
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import expressValidator from 'express-validator';
const router = require('./routes/router');
const app: express.Application = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(expressValidator({
  errorFormatter (param, msg, value){
    return {
      param,
      msg
    }
  }
}));
app.use(logger('dev'));

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

router(app);


module.exports = app;