import { BaseController } from "./basecontroller";

export class AuthEndpoints extends BaseController {

  private readonly basePath = '/api/auth';
  async login(email: string, password: string): Promise<{ jwt: string }> {
    return this.post(`${this.basePath}/login`, { email, password });
  }

  async logout(): Promise<void> {
    await this.post(`${this.basePath}/logout`, {});
  }
}