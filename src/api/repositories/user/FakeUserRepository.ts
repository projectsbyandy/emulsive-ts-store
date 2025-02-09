import { readFile } from "../../helpers/fileReader";
import { generateId } from "../../helpers/mongo";
import { User, UserFilterParams } from "../../types";
import { IUserRepository } from "./IUserRepository";
import { filterData } from "./userFilterRules";

class FakeUserRepository implements IUserRepository {

  private PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'users.json'];
  private static initialRead = true;

  private static users: User[];
  
  async getUsers(filterParams: UserFilterParams): Promise<User[]> {
    FakeUserRepository.users = await this.readUsers();
    
    return filterData(FakeUserRepository.users, filterParams);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    FakeUserRepository.users = await this.readUsers();
    return FakeUserRepository.users.find(user => user.email === email) ?? null;
  }
  
  async getUserById(id: string): Promise<User | null> {
    FakeUserRepository.users = await this.readUsers();
    return FakeUserRepository.users.find(user => user.userId === id) ?? null;  }

  createUser(user: User): void {
    user.userId = generateId();
    FakeUserRepository.users.push(user);
  }

  async deleteUserById(id: string): Promise<void> {
    FakeUserRepository.users = FakeUserRepository.users.filter(user => user.userId !== id);
  }
  
  updateUserById(id: string, values: Record<string, any>): void {
    FakeUserRepository.users.map(user => {
      if (user.userId === id)
        return {...user, ...values}
    });
  }

  private async readUsers() : Promise<User[]> {
    if (FakeUserRepository.initialRead) {
      const rawData = await readFile(this.PATHS_TO_FAKE_DATA)
      FakeUserRepository.users = JSON.parse(rawData);
      FakeUserRepository.initialRead = false;
    }
    
    return FakeUserRepository.users;
  }
}

export default new FakeUserRepository();