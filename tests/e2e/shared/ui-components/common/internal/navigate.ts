import { Section } from "../../../models";
import { Ui } from "@/e2e/shared/playwright-helpers/ui";
import { z } from 'zod';
import { INavigate } from "../INavigate";

export class Navigate extends Ui implements INavigate {
  async To(section: Section) {
     let url = z.string().parse(process.env.EMULSIVE_STORE_URL);

    switch(section) {
      case Section.Home:
        break;
      case Section.Products:
        url += "/Products";
        break;
      default:
        new Error("Section not supported");
    }

    await this.page.goto(url);
  }
}