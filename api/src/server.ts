import * as dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}
const app = require('./app');
import {resolvePort, env} from './utils';
import socketIO from 'socket.io';
import http from 'http';

process.on('SIGINT', () => {
  process.exit(0);
});
const IS_TEST = process.env.NODE_ENV === 'test';
const portCandidate = IS_TEST ? env('TEST_PORT') : env('PORT');

const port: number = resolvePort(portCandidate);

const server = new http.Server(app);
const io = new socketIO(server);

server.listen(port);

server.on('listening', () => {
  if(! IS_TEST){
    console.log(`Listening at http://localhost:${port}`);
  }
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

module.exports = server;
