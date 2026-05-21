import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseController {
  constructor(protected request: APIRequestContext) {}

  protected async get(
    url: string,
    params?: Record<string, string>
  ): Promise<APIResponse> {
    const response = await this.request.get(url, { params });
    return response;
  }

  protected async post<TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<APIResponse> {
    const response = await this.request.post(url, { data: body });
    return response;
  }

  protected async put<TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<APIResponse> {
    const response = await this.request.put(url, { data: body });
    return response;
  }

  protected async patch<TBody = unknown>(
    url: string,
    body: TBody
  ): Promise<APIResponse> {
    const response = await this.request.patch(url, { data: body });
    return response;
  }

  protected async delete(url: string): Promise<APIResponse> {
    const response = await this.request.delete(url);
    return response;
  }
}