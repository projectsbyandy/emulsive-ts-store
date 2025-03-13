import { Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/RequestWithUser";
import { IOrderRepository } from "../repositories/order/IOrderRepository";
import OrderRepositoryFactory from "../repositories/order/OrderRepositoryFactory";
import { CreateOrderRequest } from "../interfaces/CreateOrderRequest";
import { OrderFilterParams, OrderResponse } from "../types";
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

    let orderResponse = await orderRepo.getOrders();
    parseMeta(orderResponse, filters);

    if (filters.page) {
      orderResponse = paginate(orderResponse);
    }

    res.status(200).json(orderResponse).end();
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
  
      let orderResponse = {
        data: (await orderRepo.getOrders()).data.filter(order => order.userId === req.user?.userId)
      }

      parseMeta(orderResponse, filters);

      if (filters.page) {
        orderResponse = paginate(orderResponse);
      }

      res.status(200).json(orderResponse).end();
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

const paginate = (orderResponse: OrderResponse
) : OrderResponse => {
  orderResponse.data = paginateSplit(orderResponse.data, pageSize, orderResponse.meta!.pagination.page)

  return orderResponse;
}

const parseMeta = (orderResponse: OrderResponse, orderFilterParams: OrderFilterParams): OrderResponse => {
  orderResponse.meta = orderResponse.meta || { pagination: { total:0, pageCount:0, pageSize:0, page:0} };
  orderResponse.meta.pagination.total ?? orderResponse.data.length;

  orderResponse.meta.pagination.total = orderResponse.data.length;
  orderResponse.meta.pagination.pageCount = Math.ceil(orderResponse.data.length / pageSize);
  orderResponse.meta.pagination.pageSize = pageSize;
  orderResponse.meta.pagination.page = Number(orderFilterParams.page);

  return orderResponse;
}