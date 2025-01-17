import crypto from 'crypto';

  const secret = "EmulsiveFilm";

  export const generateRandom = () => crypto.randomBytes(128).toString('base64');
  export const generateAuthenticationCode = (salt: string, password: string) => 
    crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('base64');