import { Router } from 'express';
import { getAllUsers, deleteUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.get('/usersNoAuth', getAllUsers);
  router.get('/user/:id', isAuthenticated, getUser);
  router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
}