import { NextFunction, Response } from 'express';
import _ from 'lodash';
import { verifyJwt } from '../helpers/auth';
import { type User } from '../types';
import { RequestWithUser } from '../interfaces/RequestWithUser';

export const isAuthenticated = async (req: RequestWithUser, res: Response, next: NextFunction) : Promise<void> => {
  try{
     let sessionToken = req.cookies["EMULSIVE-STORE-AUTH"];

     if (!sessionToken) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          sessionToken = authHeader.split(' ')[1];
        }
     }

     if (!sessionToken) {
      console.log('Session cookie not found');
      res.status(401).send('Not authenticated');
      return;
     }

     const user = verifyJwt<User>(sessionToken);
     req.user = user;

     next();
  } catch(error) {
    console.log(error);
    if (error instanceof Error && error.message === 'Invalid token') {
      res.status(401).send('Session token is invalid');
      return;
    }
    next(error);
  }
}

export const isOwner = async (req: RequestWithUser, res: Response, next: NextFunction ) : Promise<void> => {
  try  {
     const { id } = req.params;

     // userId retrieved from the cookies
     const loggedInUserId = req.user?.userId;

     if (!loggedInUserId) {
      console.log("Unable to retrieve logged in user id");
      res.status(403).send('Unable to authenticate');
      return;
     }

    if (loggedInUserId !== id) {
      console.log(`Logged in user is not authorized to delete user: ${id}`);
      res.status(403).send('Problem with request');
      return;
    }

    next();
  } catch(error) {
    console.log(error);
    next(error);
  }
}