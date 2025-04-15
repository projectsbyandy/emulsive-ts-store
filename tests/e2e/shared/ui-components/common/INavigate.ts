import { Section } from "@e2e-shared/models";

 export interface INavigate {
    To(section: Section): Promise<void>
 }