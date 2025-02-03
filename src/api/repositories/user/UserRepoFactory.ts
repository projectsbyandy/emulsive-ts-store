import { getApiConfig } from "../../helpers/configManager";
import FakeUserRepository from "./FakeUserRepository";
import { IUserRepository } from "./IUserRepository";
import UserRepository from "./UserRepository";

class UserRepositoryFactory {
  get = async () : Promise<IUserRepository> => {
    const config = await getApiConfig();
    
    return config.useFake ? FakeUserRepository : UserRepository;
  }
}

export default new UserRepositoryFactory();
