import * as dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}
import * as express from 'express';
import apiV1Router from './routes/v1';
import {API_V1} from './constants/routes';
import * as mongoose from 'mongoose';
import {resolvePort, env} from './utils';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as passport from 'passport';
import {AUTH_ROUTE  } from './constants/routes';
import AuthRouter from './routes/auth';
import * as cors from 'cors';
import * as socketIO from 'socket.io';
import * as http from 'http';

process.on('SIGINT', () => {
  process.exit(0);
});

const app: express.Application = express();
const portCandidate = process.env.NODE_ENV === 'test' ?
                        env('TEST_PORT') : env('PORT');

const port: number = resolvePort(portCandidate);

const server = new http.Server(app);
const io = new socketIO(server);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev'));

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

const db_host:string = env('DB_HOST');
mongoose.connect(db_host,{useMongoClient: true});

app.use(API_V1, apiV1Router);
app.use(AUTH_ROUTE,AuthRouter);

server.listen(port);

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
