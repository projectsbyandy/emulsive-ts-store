import { NextFunction, Request, Response } from 'express';
import userRepository from '../repositories/user/UserRepoFactory';
import { IUserRepository } from '../repositories/user/IUserRepository';

let userRepo: IUserRepository;

(async () => {
  userRepo = await userRepository.get();
})();

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const users = await userRepo.getUsers();
    
    return res.status(200).json(users).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { id } = req.params;

    await userRepo.deleteUserById(id);
    
    console.log(`Deleted user with id: ${id}`);
    return res.status(204).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { id } = req.params;
    let user = await userRepo.getUserById(id);

    if(!user) {
      return res.status(404).send(`User with id: ${id} not found`);
    }
    
    return res.status(200).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}