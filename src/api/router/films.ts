import { Router } from 'express';
import { films } from '../controllers/films'

export default (router: Router) => {
  router.get('/api/films', films);
}