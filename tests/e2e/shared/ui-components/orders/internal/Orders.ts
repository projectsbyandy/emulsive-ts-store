import { Ui, hasContentLoaded, traverseUp} from "@/e2e/shared/playwright-helpers";
import { IOrders } from "../IOrders";
import { Locator } from "@playwright/test";
import { Order } from "@e2e-shared/models";
import z from 'zod';

export class Orders extends Ui implements IOrders {
  // locators
  private totalOrders: Locator = this.page.getByTestId("totalOrders");
  private ordersTable: Locator = this.page.getByTestId("OrdersTable");
  private nextButton: Locator = this.page.locator("a span:text('Next')");
  
  // operations
  async getOrder(name: string): Promise<Order> {
    const multiplePages = await hasContentLoaded(this.nextButton)
    if (multiplePages) {
      return await this.findOrderAcrossPages(name);
    } 
    
    const order = await this.findOrderOnCurrentPage(name);
    if (order)
      return order;
    
    throw new Error(`Order with Name: ${name} not found on 1st Page`);
  }

  private async findOrderAcrossPages(name: string): Promise<Order> {
    let lastPage = false
    
    while(!lastPage) {
      const order = await this.findOrderOnCurrentPage(name);
      if (order)
        return order;

      const hrefNext = await traverseUp(this.nextButton, 1).getAttribute('href');

      // last next button iterates back to the first page
      if (hrefNext?.endsWith('page=1'))
        lastPage = true;
      else {
        await this.nextButton.click();
        await hasContentLoaded(this.nextButton);
      }  
    }

    throw new Error(`Order with Name: ${name} not found across all pages`);
  }

  private async findOrderOnCurrentPage(name: string): Promise<Order|undefined> {
    const ordersOnPage: Order[] = await this.getOrdersOnPage();
      const order = ordersOnPage.find(order => order.name === name)
      
      return order ?? undefined;
  }

  private async getOrdersOnPage(): Promise<Order[]> {
    let orders: Order[] = [];
    const orderRow = this.ordersTable.locator("tbody tr");
    const count = await orderRow.count();

    for(let row=0; row<count; row++) {
      let order: Order = {
        id: z.coerce.number().parse(await orderRow.nth(row).getByTestId('id').textContent()),
        name: z.string().parse(await orderRow.nth(row).getByTestId('name').textContent()),
        address: z.string().parse(await orderRow.nth(row).getByTestId('address').textContent()),
        productCount: z.coerce.number().parse(await orderRow.nth(row).getByTestId('numberCartItems').textContent()),
        costWithCurrency: z.string().parse(await orderRow.nth(row).getByTestId('orderTotal').textContent()),
        purchased: z.coerce.date().parse(await orderRow.nth(row).getByTestId('createdOn').textContent()),
      }
      orders.push(order);
    }

    return orders;
  }

  async hasLoaded(): Promise<boolean> {
    return hasContentLoaded(this.totalOrders);
  }
}