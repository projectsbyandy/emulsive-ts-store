import { ILoadable } from "../../common";

export interface ISignIn extends ILoadable{
  loginAsGuest(): Promise<void>
}