import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/RequestWithUser";
import { IOrderRepository } from "../repositories/order/IOrderRepository";
import OrderRepositoryFactory from "../repositories/order/OrderRepositoryFactory";
import { CreateOrderRequest } from "../interfaces/CreateOrderRequest";

let orderRepo: IOrderRepository;

(async () => {
  orderRepo = await OrderRepositoryFactory.get();
})();

export const getOrders = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<void> => {
  try {
    if (req.user) {
      
      if (!req.user.userId) {
        res.status(401).send({ error:'UserId not found' });
          return;
      }

      const orders = await orderRepo.getOrders();
      res.status(200).json(orders).end();
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const createOrder = async (req: RequestWithUser, res: Response, next: NextFunction ) : Promise<void> => {
  try {
    let order: CreateOrderRequest = req.body;
    if (!order.data?.name ||  !order.data.address) {
      console.log('One or more fields: name, address are missing')
      res.status(400).send({error:'One or more fields: name, address are missing'});
      return;
    }

    var createdOrderId = await orderRepo.createOrder(order, req.user?.userId as string);
    
    console.log('Order successfully created');
    res.status(201).send({message: "Created Order", orderId: createdOrderId})
  } catch(error) {
    console.log(error);
    next(error);
  }
}