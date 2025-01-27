import { type User } from '@/api/types'

export default interface IUserRepository {
  getUsers(): Promise<Array<User> | null>,
  getUserByEmail(email: string): Promise<User>;
  getUserBySessionToken(sessionToken: string): Array<User>
  getUserById(id: string): User;
  createUser(values: Record<string, any>): void;
  deleteUserById(id: string): void;
  updateUserById(id: string, values: Record<string, any>): void; 
}