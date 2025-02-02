import { type Order } from "../types/Order";

export const getOrderForUser = async (orderId: string, userId: string) : Promise<Order> => {
  return {
    id: orderId,
    userId: userId
  }
}