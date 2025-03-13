import { Router } from 'express';
import { getAllOrders, getOrdersForUser, createOrder } from '../controllers/orders';
import { isAuthenticated } from '../middleware';

export default (router: Router) => {
  router.get('/api/orders/all', getAllOrders);
  router.get('/api/orders/', isAuthenticated, getOrdersForUser);
  router.post('/api/orders/', isAuthenticated, createOrder);
}