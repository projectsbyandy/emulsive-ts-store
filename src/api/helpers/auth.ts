import crypto from 'crypto';
import { type User } from '../types';
import jwt from 'jsonwebtoken';

const secret = "EmulsiveFilm";

export const generateRandom = () => crypto.randomBytes(128).toString('base64');
export const generateAuthenticationCode = (salt: string, password: string) => 
  crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('base64');

export const verifyPassword = (salt: string, password: string, expectedHash: string) : boolean =>
  generateAuthenticationCode(salt, password) === expectedHash;

export const generateJwt = (user: User): string => {
  const payload = {
    userId: user.userId,
    username: user.username
  }
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  
  return token;
}

export const verifyJwt = <T>(token: string) : T => {
  try {
    const decoded = jwt.verify(token, secret) as T;
    
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

