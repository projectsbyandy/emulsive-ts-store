import { Page } from 'playwright/test';

export class Ui {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}