import { Section } from "../types";
import { Ui } from "./ui";

export class Navigate extends Ui {
  async To(section: Section) {
     let url: string = "http://localhost:5500";

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