import { INavLinks } from "./INavLinks";
import { IUserManagement } from "./IUserManagement";

export interface IHeader {
  get NavLinks(): INavLinks;
  get UserManagement(): IUserManagement
}