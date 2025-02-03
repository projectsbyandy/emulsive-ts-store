import { getApiConfig } from "../../helpers/configManager";
import FakeUserRepository from "./FakeUserRepository";
import { IUserRepository } from "./IUserRepository";
import UserRepository from "./UserRepository";

class UserRepositoryFactory {
  get = async () : Promise<IUserRepository> => {
    const config = await getApiConfig();    
    const emulsiveFake = process.env.Emulsive_Fake?.toLocaleLowerCase() === 'true';

    return config.useFake || emulsiveFake ? FakeUserRepository : UserRepository;
  }
}

export default new UserRepositoryFactory();
