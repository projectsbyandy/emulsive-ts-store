import { Router } from 'express';
import { getAllUsers, deleteUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: Router) => {
  router.get('/api/users', isAuthenticated, getAllUsers);
  router.get('/api/usersNoAuth', getAllUsers);
  router.get('/api/user/:id', isAuthenticated, getUser);
  router.delete('/api/user/:id', isAuthenticated, isOwner, deleteUser);
}