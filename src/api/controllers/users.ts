import { NextFunction, Request, Response } from 'express';
import userRepository from '../repositories/user/UserRepoFactory';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { UserFilterParams } from '../types';
import { stringToBoolean } from '../helpers/booleanConvert';

let userRepo: IUserRepository;

(async () => {
  userRepo = await userRepository.get();
})();
 
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const filters : UserFilterParams = {
      active : typeof req.query.active === 'string' ? stringToBoolean(req.query.active) : undefined
    }

    const users = await userRepo.getUsers(filters);
    
    res.status(200).json(users).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { id } = req.params;

    await userRepo.deleteUserById(id);
    
    console.log(`Deleted user with id: ${id}`);
    res.status(204).end();
    return;
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { id } = req.params;
    let user = await userRepo.getUserById(id);

    if(!user) {
      res.status(404).send(`User with id: ${id} not found`);
      return;
    }
    
    res.status(200).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}