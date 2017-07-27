import bodyParser from 'body-parser';
import config from './config/db.config.json';
import cors from 'cors';
import express from 'express';
import http from 'http';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';
import { setGlobal } from './tools/global';
import socketIO from 'socket.io';

const app = express();
const port = 3000;

const router = express.Router();
const timeOutMongo = 300000;

app.use(methodOverride());

/* Body parsers */
app.use(bodyParser.urlencoded({
  limit: '25mb',
  extended: true
}));
app.use(bodyParser.json({ limit: '25mb' }));

/* Connection bdd */
mongoose.connect(`mongodb://${config.url}:${config.port}/${config.database}?socketTimeoutMS=${timeOutMongo}`, { useMongoClient: true });
mongoose.Promise = Promise;

/* Get all route in folder routes */
require('./tools/router')(router);

app.use(router);

app.use(express.static(path.resolve(__dirname, '../../front/build/')));
app.use(express.static(path.resolve(__dirname, '../../front/src/static/icons/')));
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../../front/build/', 'index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`app started on port ${port}`);
  }
});
const io = socketIO.listen(server);

require('./tools/io')(io);
