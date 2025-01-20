import express, { Router } from 'express';
import authentication from './authentication';
import users from './users';
import films from './films';

const router = express.Router();

export default (): Router => {
  authentication(router);
  users(router);
  films(router);
  return router;
}