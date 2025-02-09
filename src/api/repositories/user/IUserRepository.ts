import { User, UserFilterParams } from "@/api/types";

export interface IUserRepository 
{ 
  getUsers(filterParams: UserFilterParams) : Promise<User[]>;
  getUserByEmail(email: string) : Promise<User | null>;
  getUserById(id: string) : Promise<User | null>;
  createUser(user: User): void;
  deleteUserById(id: string): Promise<void>;
  updateUserById(id: string, values: Record<string, any>): void;
}