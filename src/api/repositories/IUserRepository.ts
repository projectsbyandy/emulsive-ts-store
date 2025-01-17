import { IUser } from '@/api/models'

export default interface IUserRepository {
  getUsers(): Promise<Array<IUser> | null>,
  getUserByEmail(email: string): Promise<IUser>;
  getUserBySessionToken(sessionToken: string): Array<IUser>
  getUserById(id: string): IUser;
  createUser(values: Record<string, any>): void;
  deleteUserById(id: string): void;
  updateUserById(id: string, values: Record<string, any>): void; 
}