import { Response, NextFunction } from "express";
import { getOrderForUser } from "../repositories/orderRepo";
import { RequestWithUser } from "../interfaces/RequestWithUser";

export const getOrder = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { orderId } = req.params;

    if (req.user) {
      
      if (!req.user.userId)
        throw Error("Order id is not present");

      const order = await getOrderForUser(orderId, req.user.userId);

      if (!order) {
        res.status(404).json({message: `Order with id: ${orderId} not found`}).end();
      }
       res.status(200).json(order).end();
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
}