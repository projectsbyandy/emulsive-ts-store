import { Section } from "@e2e-shared/models";

export interface INavLinks {
    select(link: Section): Promise<void>;
    isLinkVisible(link: Section): Promise<boolean>;
}