import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orders';
import { isAuthenticated } from '../middleware';

export default (router: Router) => {
  router.get('/api/orders/', isAuthenticated, getOrders);
  router.post('/api/orders/', isAuthenticated, createOrder);
}