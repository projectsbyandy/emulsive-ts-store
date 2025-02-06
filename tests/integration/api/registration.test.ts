import request from 'supertest';
import mongoose from 'mongoose';
import { serverPromise, app } from '@/api/app';
import { User } from '@/api/types';

let server: any;
let consoleSpy: jest.SpyInstance
let capturedLogs: string[] = [];
let agent: request.SuperTest<request.Test>;

beforeAll(async () => { 
  server = await serverPromise;
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Verify registration', () => {

   beforeEach(async () => {
      capturedLogs = [];
      consoleSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
        capturedLogs.push(args.join(' '));
      });
      agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
    });
  
    afterEach(() => {
      agent = null as unknown as request.SuperTest<request.Test>;
      consoleSpy.mockRestore();
    });

  it('should return 201 with valid details', async () => {
    // Arrange / Act
    const registrationResponse = await agent
    .post('/auth/register')
    .send({
        "email": "larry.p@test.com",
        "password": "test",
        "username": "Larry Parker"
      });

    // Assert
    expect(registrationResponse.status).toBe(201);
  });

  it('should return registered user on get', async () => {
    // Arrange
    const registeredUserDetails = {
      "email": "larry.p@test.com",
      "password": "test",
      "username": "Larry Parker"
    };
    
    await agent
    .post('/auth/register')
    .send(registeredUserDetails);

    // Act
    const getUsersResponse = await agent.get('/usersNoAuth');
    expect(getUsersResponse.statusCode).toBe(200);
    const users = getUsersResponse.body as User[]
    
    // Assert
    const registeredUser = users.find(user => user.email == registeredUserDetails.email)
    expect(registeredUser?.userId).toBeDefined;
    expect(registeredUser?.username).toBe(registeredUserDetails.username);
    expect(registeredUser?.authentication).toBeDefined;
  });

  it('should not register a user with the same email', async () => {
    // Arrange / Act
    const registrationResponse = await agent
    .post('/auth/register')
    .send({
        "email": "bobdoe@test.com",
        "password": "test",
        "username": "Bob Doe"
      });

      // Assert
      expect(registrationResponse.statusCode).toBe(400);
      expect(capturedLogs).toContain('Unable to register user as bobdoe@test.com already exists');
  });

  it.each([
    ['should return 400 for no payload', {}], 
    ['should return 400 when missing email', {'password': '1234'}], 
    ['should return 400 when missing password', {'email': 'bobdoe@test.com'}]
  ])(
    '%s',
    async (_, payload) => {
      const loginResponse = await agent
    .post('/auth/register')
    .send(payload);

    expect(loginResponse.statusCode).toBe(400);
    expect(loginResponse.text).toBe('One or more of the mandatory fields (email, password, username) have not been specified.');
    }
  );
});