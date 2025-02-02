import { Router } from 'express';
import { getOrder } from '../controllers/orders';
import { isAuthenticated } from '../middleware';

export default (router: Router) => {
  router.get('/orders/:userId/:orderId', isAuthenticated, getOrder);
}