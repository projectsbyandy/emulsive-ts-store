import { NextFunction, Request, Response } from 'express'
import { generateRandom, generateAuthenticationCode, generateJwt, verifyPassword} from '../helpers/auth';
import userRepository from '../repositories/user/UserRepositoryFactory';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { AuthResponse } from '../types/AuthResponse';
import { User } from '../types';

let userRepo: IUserRepository;

(async () => {
  userRepo = await userRepository.get();
})();


export const login = async(req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      res.status(400).send({error:'One or more of the mandatory fields (email, password) have not been specified.'});
      return
    }

    const retrievedUser: User | null = await userRepo.getUserByEmail(email);

    if (!retrievedUser) {
      console.log(`User: ${email} does not exist`);
       res.status(401).send({ error:'Unable to login' });
       return;
    }

    if (!verifyPassword(retrievedUser.authentication.salt, password, retrievedUser.authentication.passwordHash)) {
      console.log(`Password hash did not match for user: ${email}`);
       res.status(401).send({ error:'Unable to login' });
       return
    }

    const sessionToken = generateJwt(retrievedUser);

    res.cookie('EMULSIVE-STORE-AUTH', sessionToken, { domain: process.env.Emulsive_Cookies_Test ? '127.0.0.1' : 'localhost', path: '/' });

    console.log(`User successfully logged in ${email}`);

    const authResponse : AuthResponse = {
      jwt: sessionToken,
      user: {
        userId: retrievedUser.userId,
        username: retrievedUser.username,
        email: retrievedUser.email,
        active: retrievedUser.active
      }
    }

     res.status(200).send(authResponse);
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if(!email || !password || !username) {
      res.status(400).send({ error:'One or more of the mandatory fields (email, password, username) have not been specified.' });
      return;
    }

    const existingUser = await userRepo.getUserByEmail(email);

    if (existingUser) {
      console.log(`Unable to register user as ${email} already exists`);
      res.status(400).send({ error: 'Unable to register user' });
      return;
    }

    const salt = generateRandom();
    userRepo.createUser({
      email,
      username,
      authentication: {
        salt,
        passwordHash: generateAuthenticationCode(salt, password)
      },
      active: true
    });

    const registeredUser = await userRepo.getUserByEmail(email);

    if(registeredUser === null) {
      res.status(500).send({ error: 'Problem reading user' });
      return;
    }
    
    const sessionToken = generateJwt(registeredUser);

    console.log(`User successfully registered ${email}`);
    
    const authResponse : AuthResponse = {
      jwt: sessionToken,
      user: {
        userId: registeredUser.userId,
        username: registeredUser.username,
        email: registeredUser.email,
        active: registeredUser.active
      }
    }
    
    res.status(201).json(authResponse).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}