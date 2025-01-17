import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

import { getUserBySessionToken } from '../repositories/userRepo'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try{
     const sessionToken = req.cookies["EMULSIVE-STORE-AUTH"];

     if (!sessionToken) {
      console.log('Session cookie not found');
      return res.sendStatus(403);
     }

     const existingUser = await getUserBySessionToken(sessionToken)

     if (!existingUser) {
      console.log('existing user with session cookie not found');
      return res.sendStatus(403);
     }

     _.merge(req, { identity: existingUser});

     next();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction ) : Promise<any> => {
  try  {
     const { id } = req.params;
     
     // identity._id during isAuthenticated merge
     const loggedInUserId = _.get(req, 'identity.userId') as unknown as string;

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