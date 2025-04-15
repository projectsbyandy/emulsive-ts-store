import { User } from "@e2e-shared/models";
import { ILoadVerification } from "../../common";

export interface ISignIn extends ILoadVerification{
  loginAsGuest(): Promise<void>;
  login(user: User): Promise<void>;
}