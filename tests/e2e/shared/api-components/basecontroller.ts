import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseController {
  constructor(protected request: APIRequestContext) {}

  protected async get<TResponse>(
    url: string,
    params?: Record<string, string>
  ): Promise<TResponse> {
    const response = await this.request.get(url, { params });
    await this.assertOk(response);
    return response.json();
  }

  protected async post<TResponse, TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<TResponse> {
    const response = await this.request.post(url, { data: body });
    await this.assertOk(response);
    return response.json();
  }

  protected async put<TResponse, TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<TResponse> {
    const response = await this.request.put(url, { data: body });
    await this.assertOk(response);
    return response.json();
  }

  protected async patch<TResponse, TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<TResponse> {
    const response = await this.request.patch(url, { data: body });
    await this.assertOk(response);
    return response.json();
  }

  protected async delete<TResponse = void>(url: string): Promise<TResponse> {
    const response = await this.request.delete(url);
    await this.assertOk(response);
    return response.status() === 204 ? undefined as TResponse : response.json();
  }

  private async assertOk(response: APIResponse): Promise<void> {
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`API call failed: ${response.status()} ${response.statusText()} — ${body}`);
    }
  }
}