import { NextFunction, Request, Response } from 'express';
import userRepository from '../repositories/user/UserRepoFactory';

const userRepo = await userRepository.get();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
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
    return res.status(204).json({message: `Deleted user with id: ${id}`}).end();
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
      return res.status(404).json({message: `User with id: ${id} not found`}).end();
    }
    
    return res.status(200).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}