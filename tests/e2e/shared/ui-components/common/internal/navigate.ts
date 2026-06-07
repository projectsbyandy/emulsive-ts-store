import { Section } from "@e2e-shared/models";
import { Ui } from "@/e2e/shared/playwright-helpers/Ui";
import { INavigate } from "../INavigate";
import { testConfig } from "@/e2e/shared/models/testConfig";

export class Navigate extends Ui implements INavigate {
  async To(section: Section) {
     let url = testConfig.emulsiveStoreUrl;

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