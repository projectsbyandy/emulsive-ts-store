import { NextFunction, Request, Response } from 'express';
import { getUsers, deleteUserById, getUserById} from '../repositories/fakeUserRepo';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const users = await getUsers();
    
    return res.status(200).json(users).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    
    return res.status(204).json({message: `Deleted user with id: ${id}`}).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { id } = req.params;
    let user = await getUserById(id);

    if(!user) {
      return res.status(404).json({message: `User with id: ${id} not found`}).end();
    }
    
    return res.status(200).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}