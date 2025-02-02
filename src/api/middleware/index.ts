import { NextFunction, Response } from 'express';
import _ from 'lodash';

import { verifyJwt } from '../helpers/auth';
import { type User } from '../types';
import { RequestWithUser } from '../interfaces/RequestWithUser';

export const isAuthenticated = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<any> => {
  try{
     const sessionToken = req.cookies["EMULSIVE-STORE-AUTH"];

     if (!sessionToken) {
      console.log('Session cookie not found');
      return res.sendStatus(403);
     }

     const user = verifyJwt<User>(sessionToken);
     req.user = user;

     next();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const isOwner = async (req: RequestWithUser, res: Response, next: NextFunction ) : Promise<any> => {
  try  {
     const { id } = req.params;
    
     // userId retrieved from the cookies
     const loggedInUserId = req.user?.userId;

     if (!loggedInUserId) {
      console.log("Unable to retrieve logged in user id");
      return res.sendStatus(403);
     }

    if (loggedInUserId !== id) {
      console.log(`Logged in user is not authorized to delete user: ${id}`);
      
      return res.sendStatus(403); 
    }

    next();
  } catch(error) {
    console.log(error);
    next(error);
  }
}