import { APIResponse } from "@playwright/test";
import { BaseController } from "./basecontroller";

export class AuthEndpoints extends BaseController {

  private readonly basePath = '/api/auth';
  async login(email: string, password: string): Promise<APIResponse> {
    const response = await this.post(`${this.basePath}/login`, { email, password });
    return response;
  }

  async logout(): Promise<void> {
    await this.post(`${this.basePath}/logout`, {});
  }
}