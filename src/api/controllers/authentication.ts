import { NextFunction, Request, Response } from 'express'
import { generateRandom, generateAuthenticationCode, generateJwt, verifyPassword} from '../helpers/auth';
import userRepository from '../repositories/user/UserRepoFactory';
import { IUserRepository } from '../repositories/user/IUserRepository';

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

    return res.status(200).send(sessionToken);
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
    const user = userRepo.createUser({
      email,
      username,
      authentication: {
        salt,
        passwordHash: generateAuthenticationCode(salt, password)
      }
    });

    console.log(`User successfully registered ${email}`);
    
    return res.status(201).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}