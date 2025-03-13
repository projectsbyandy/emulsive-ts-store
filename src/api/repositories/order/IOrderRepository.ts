import { CreateOrderRequest } from "@/api/interfaces/CreateOrderRequest";
import { Order } from "@/api/types";

export interface IOrderRepository 
{ 
  getOrdersForUser(userId: string) : Promise<Order[]>;
  getOrders() : Promise<Order[]>;
  createOrder(order: CreateOrderRequest, userId: string) : Promise<Order | null>;
}