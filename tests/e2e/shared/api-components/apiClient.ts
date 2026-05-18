import  { APIRequestContext } from '@playwright/test';
import { AuthEndpoints } from './authEndpoints';
import { OrderEndpoints } from './orderEndpoints';

export class ApiClient {

  readonly auth: AuthEndpoints;
  readonly orders: OrderEndpoints;

  constructor(request: APIRequestContext) {
    this.auth = new AuthEndpoints(request);
    this.orders = new OrderEndpoints(request)
  }
}