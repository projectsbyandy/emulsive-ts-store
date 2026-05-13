import { Section } from "@e2e-shared/models";

export interface IUserManagement {
   select(link: Section): Promise<void>;
   getGreetingText(): Promise<string>;
   isDisplayed(link: Section): Promise<boolean>;
}