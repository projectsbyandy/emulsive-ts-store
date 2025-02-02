import express, { Router } from 'express';
import authentication from './authentication';
import users from './users';
import films from './films';
import orders from './orders';

const router = express.Router();

export default (): Router => {
  authentication(router);
  users(router);
  films(router);
  orders(router);
  
  return router;
}