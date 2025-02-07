import request from 'supertest';

export const performLogin = async (agent: request.SuperTest<request.Test>, email: string, password: string) : Promise<request.Response> => {
  const loginResponse = await agent
    .post('/auth/login')
    .send({
      'email': email,
      'password': password
    });

  return loginResponse;
 }

 export const performRegistration = async(agent: request.SuperTest<request.Test>, email: string, password: string, username: string): Promise<request.Response> => {
  const registrationResponse = await agent
    .post('/auth/register')
    .send({
        "email": email,
        "password": password,
        "username": username
      });

    return registrationResponse;
 }