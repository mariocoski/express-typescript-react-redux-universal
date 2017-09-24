import * as dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}
import * as express from 'express';
import apiV1Router from './routes/v1';
import {API_V1} from './constants/routes';
import * as mongoose from 'mongoose';
import {resolvePort} from './utils';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as passport from 'passport';
import {AUTH_ROUTE  } from './constants/routes';
import AuthRouter from './routes/auth';
import * as cors from 'cors';

process.on('SIGINT', () => {
  process.exit(0);
});

const app: express.Application = express();
const portCandidate = process.env.NODE_ENV === 'test' ? 
                        process.env.TEST_PORT : process.env.PORT;
const port: number = resolvePort(portCandidate);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); 

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

const db_host:string = process.env.DB_HOST || 'localhost';
mongoose.connect(db_host,{useMongoClient: true});

app.use(API_V1, apiV1Router);
app.use(AUTH_ROUTE,AuthRouter);

const server = app.listen(port);

server.on('listening', () => {
  console.log(`Listening at http://localhost:${port}`);
});


server.on('error',(error: any)=>{

  if (error.syscall !== "listen") {
    throw error;
  }  
  const bind = typeof port === "string"
      ? "Pipe " + port
      : "Port " + port;
  
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

export default server;
