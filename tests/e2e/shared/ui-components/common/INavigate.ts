import { Section } from "../../models";

 export interface INavigate {
    To(section: Section): Promise<void>
 }