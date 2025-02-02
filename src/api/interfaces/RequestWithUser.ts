import { Request } from "express";
import { type User } from "../types";

export interface RequestWithUser extends Request {
  user?: User
}