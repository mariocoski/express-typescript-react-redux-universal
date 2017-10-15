if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
import {resolvePort, env} from './utils';
import * as socketIO from 'socket.io';
import * as http from 'http';

const iconvLite = require('iconv-lite');
iconvLite.encodingExists('foo');

const app = require('./app');
const models = require('./models');

process.on('SIGINT', () => {
  process.exit(0);
});

const IS_TEST = process.env.NODE_ENV === 'test';
const portCandidate = IS_TEST ? env('TEST_PORT') : env('PORT');

const port: number = resolvePort(portCandidate);

async function dbInit(){
  await models.sequelize.sync();
}

const server = new http.Server(app);
if(process.env.NODE_ENV !== 'test'){
  dbInit();
}
server.listen(port, () => {
  if(! IS_TEST){
    console.log(`Listening at http://localhost:${port}`);
  }
});
server.on('error', onError);


const io = socketIO(server);

function onError(error: any){  
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
}

module.exports = server;
