import { NextFunction, Request, Response } from 'express'
import { generateRandom, generateAuthenticationCode, generateJwt, verifyPassword} from '../helpers/auth';
import userRepository from '../repositories/user/UserRepoFactory';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { AuthResponse } from '../types/AuthResponse';

let userRepo: IUserRepository;

(async () => {
  userRepo = await userRepository.get();
})();


export const login = async(req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).send('One or more of the mandatory fields (email, password) have not been specified.');
    }

    const retrievedUser = await userRepo.getUserByEmail(email);

    if (!retrievedUser) {
      console.log(`User: ${email} does not exist`);
      res.status(401).send('Unable to login');
      return;
    }

    if (!verifyPassword(retrievedUser.authentication.salt, password, retrievedUser.authentication.passwordHash)) {
      console.log(`Password hash did not match for user: ${email}`);
      return res.status(401).send('Unable to login');
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

    return res.status(200).send(authResponse);
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if(!email || !password || !username) {
      res.status(400).send('One or more of the mandatory fields (email, password, username) have not been specified.');
      return;
    }

    const existingUser = await userRepo.getUserByEmail(email);

    if (existingUser) {
      console.log(`Unable to register user as ${email} already exists`);
      return res.status(400).json({ message: 'Unable to register user' });
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
      throw Error(`Problem reading registered user ${email}`);
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
    
    return res.status(201).json(authResponse).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}