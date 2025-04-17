import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/RequestWithUser";
import { IOrderRepository } from "../repositories/order/IOrderRepository";
import OrderRepositoryFactory from "../repositories/order/OrderRepositoryFactory";
import { CreateOrderRequest } from "../interfaces/CreateOrderRequest";
import { Order, OrderFilterParams, OrderMeta, OrdersResponse } from "../types";
import { paginateSplit } from "../helpers/pagination";

let orderRepo: IOrderRepository;
const pageSize = 5;

(async () => {
  orderRepo = await OrderRepositoryFactory.get();
})();

export const getAllOrders = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const filters : OrderFilterParams = {
      page: Number(req.query.page ?? 1)
    }

    let orders = await orderRepo.getOrders();
    const processedMeta = parseMeta(orders, filters);

    if (filters.page) {
      orders = paginate(orders, processedMeta.pagination.page);
    }

    const response: OrdersResponse = {
      data: orders,
      meta: processedMeta
    }

    res.status(200).json(response).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const getOrdersForUser = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<void> => {
  try {
    if (req.user) {
      if (!req.user.userId) {
        res.status(401).send({ error:'UserId not found' });
        return;
      }

      const filters : OrderFilterParams = {
        page: Number(req.query.page ?? 1)
      }
  
     let orders = await orderRepo.getOrdersForUser(req.user?.userId);

     const processedMeta = parseMeta(orders, filters);

      if (filters.page) {
        orders = paginate(orders, processedMeta.pagination.page);
      }

      const response: OrdersResponse = {
        data: orders,
        meta: processedMeta
      }

      res.status(200).json(response).end();
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

    var createdOrder = await orderRepo.createOrder(order, req.user?.userId as string);
    
    console.log('Order successfully created');
    res.status(201).send({message: "Created Order", order: createdOrder})
  } catch(error) {
    console.log(error);
    next(error);
  }
}

const paginate = (orders: Order[], page: number) : Order[] => {
  return paginateSplit(orders, pageSize, page)
}

const parseMeta = (orders: Order[], orderFilterParams: OrderFilterParams): OrderMeta => {

  return {
    pagination : {
      total: orders.length,
      pageCount: Math.ceil(orders.length / pageSize),
      pageSize: pageSize,
      page: Number(orderFilterParams.page)
    }
  }
}