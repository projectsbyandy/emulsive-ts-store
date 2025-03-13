import { CreateOrderRequest } from "@/api/interfaces/CreateOrderRequest";
import { Order } from "@/api/types";
import { IOrderRepository } from "./IOrderRepository";
import { readFile } from "@/api/helpers/fileReader";

class FakeOrderRepository implements IOrderRepository {
  private PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'orders.json'];

  private static orders: Order[];
  private static initialRead = true;

  async getOrdersForUser(userId: string): Promise<Order[]> {
    const orders = FakeOrderRepository.orders = await this.readOrders();
    return orders.filter(order => order.userId === userId);
  }

  async getOrders(): Promise<Order[]> { return await this.readOrders()};

  async createOrder(orderToCreate: CreateOrderRequest, userId: string): Promise<Order | null> {
    try {
      FakeOrderRepository.orders = await this.readOrders();
      const newOrderId = (FakeOrderRepository.orders.sort((a, b) => (b.orderId as number) - (a.orderId as number))[0]?.orderId as number) + 1;
      const order : Order = {
        ...orderToCreate.data as Order,
        userId: userId,
        orderId: newOrderId
      }
  
      FakeOrderRepository.orders.push(order);
  
      return order;
    } catch (error) {
      console.log(`Problem creating Order: ${error}}`)
      return null;
    }
  }

  private async readOrders() : Promise<Order[]> {
    if (FakeOrderRepository.initialRead) {
      const rawData = await readFile(this.PATHS_TO_FAKE_DATA)
      FakeOrderRepository.orders = JSON.parse(rawData);
      FakeOrderRepository.initialRead = false;
    }
    
    return FakeOrderRepository.orders;
  }
}

export default new FakeOrderRepository();
