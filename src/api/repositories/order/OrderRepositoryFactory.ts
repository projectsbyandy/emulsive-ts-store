import { getApiConfig } from "../../helpers/configManager";
import FakeOrderRepository from "./FakeOrderRepository";
import { IOrderRepository } from "./IOrderRepository";

class OrderRepositoryFactory {
  get = async () : Promise<IOrderRepository> => {
    const config = await getApiConfig();    
    const emulsiveFake = process.env.Emulsive_Fake?.toLocaleLowerCase() === 'true';

    return config.useFake || emulsiveFake ? FakeOrderRepository : FakeOrderRepository;
  }
}

export default new OrderRepositoryFactory();
