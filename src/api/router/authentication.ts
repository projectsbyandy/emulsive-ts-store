import { Router } from 'express';
import { register, login } from '../controllers/authentication'


export default (router: Router) => {  
  router.post('/api/auth/register', register);
  router.post('/api/auth/login', login);
}