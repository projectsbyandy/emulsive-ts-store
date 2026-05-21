import { BaseController } from "./basecontroller";

export class OrderEndpoints extends BaseController {
  private readonly basePath = '/api/orders';
  
  async deleteOrder(orderId: number): Promise<void> {
     await this.delete(`${this.basePath}/${orderId}`);
  }
}