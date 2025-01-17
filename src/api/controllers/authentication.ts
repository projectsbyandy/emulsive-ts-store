import { NextFunction, Request, Response } from 'express'
import { createUser, getUserByEmail, updateUserSessionByEmail } from '../repositories/userRepo';
import { generateRandom, generateAuthenticationCode} from '../helpers/auth';

export const login = async(req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      res.statusMessage = 'One or more of the mandatory fields (email, password) have not been specified.'
      return res.sendStatus(400); 
    }

    const retrievedUser = await getUserByEmail(email);

    if(!retrievedUser) {
      console.log(`User: ${email} does not exist`);
      res.status(401).json({ message: 'Unable to login' });
      return;
    }

    const expectedHash = generateAuthenticationCode(retrievedUser.authentication.salt, password);

    if(retrievedUser.authentication.password !== expectedHash) {
      console.log(`Password hash did not match for user: ${email}`);
      return res.status(401).json({ message: 'Unable to login' });
    }

    const salt = generateRandom();
    retrievedUser.authentication.sessionToken = generateAuthenticationCode(salt, retrievedUser.email);

    updateUserSessionByEmail(retrievedUser.email, retrievedUser.authentication.sessionToken);
    res.cookie('EMULSIVE-STORE-AUTH', retrievedUser.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(retrievedUser).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if(!email || !password || !username) {
      res.status(400).json({ message: 'One or more of the mandatory fields (email, password, username) have not been specified.' });
      return;
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log(`Unable to register user as ${email} already exists`);
      return res.status(400).json({ message: 'Unable to register user' });
    }

    const salt = generateRandom();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: generateAuthenticationCode(salt, password)
      }
    });

    console.log(`User successfully registered ${email}`);
    return res.status(201).json(user).end();
  } catch(error) {
    console.log(error);
    next(error);
  }
}