import { X } from "lucide-react";
import { Section } from "../types";
import { Ui } from "./ui";
import { z } from 'zod';

export class Navigate extends Ui {
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