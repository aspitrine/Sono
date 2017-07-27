import restify from 'express-restify-mongoose';
import Scene from '../models/scene';

module.exports = (router) => {
  restify.serve(router, Scene);
};
