import { CreateOrderRequest } from "@/api/interfaces/CreateOrderRequest";
import { Order, OrderResponse } from "@/api/types";

export interface IOrderRepository 
{ 
  getOrdersForUser(userId: string) : Promise<OrderResponse>;
  getOrders() : Promise<OrderResponse>;
  createOrder(order: CreateOrderRequest, userId: string) : Promise<Order | null>;
}