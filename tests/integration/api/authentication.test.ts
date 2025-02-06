import request from 'supertest';
import mongoose from 'mongoose';
import { serverPromise, app } from '@/api/app';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

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

describe('Verify auth/login with mocks', () => {
  let loginResponse: request.Response;

  beforeEach(async () => {
    // Arrange
    capturedLogs = [];
    consoleSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      capturedLogs.push(args.join(' '));
    });
    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
    
    // Act
    loginResponse = await agent
            .post('/auth/login')
            .send({
              'email': 'bobdoe@test.com',
              'password': '1234'
            });
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
    consoleSpy.mockRestore();
  });

  it('should successfully authenticate', async () => {
    // Assert
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.headers['set-cookie']).toBeDefined();
  });

  it('should log on success successful login', async () => {
    // Assert
    expect(capturedLogs).toContain('User successfully logged in bobdoe@test.com');
  });

  it('should return a valid jwt ', async () => {
    // Assert
    expect(() => jwt.verify(loginResponse.text, "EmulsiveFilm")).not.toThrow(JsonWebTokenError);
  });

  it('should should drop a session cookie on successful login', async () => {
    // Assert
    expect(loginResponse.headers['set-cookie']).toHaveLength(1);
    expect(loginResponse.headers['set-cookie'][0]).toContain("EMULSIVE-STORE-AUTH=");
  });
});

describe('Verify unsuccessful auth/login with mocks', () => {
  beforeEach(async () => {
    // Arrange
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

  it('should return 401 and log when an email address specified is not found', async ()=> {
    // Act
    const loginResponse = await agent
            .post('/auth/login')
            .send({
              'email': 'thisemail@doesnotexist.com',
              'password': '1234'
            });

    // Assert
    expect(loginResponse.statusCode).toBe(401);
    expect(capturedLogs).toContain('User: thisemail@doesnotexist.com does not exist');

  });

  it('should return 401 and log when an password does not match user', async ()=> {
    // Act
    const loginResponse = await agent
    .post('/auth/login')
    .send({
      'email': 'bobdoe@test.com',
      'password': 'this is not correct'
    });

    // Assert
    expect(loginResponse.statusCode).toBe(401);
    expect(capturedLogs).toContain('Password hash did not match for user: bobdoe@test.com');
  });

  it('should return 400 and log for a missing password', async ()=> {
    // Act
    const loginResponse = await agent
    .post('/auth/login')
    .send({
      'email': 'bobdoe@test.com'
    });

    // Assert
    expect(loginResponse.statusCode).toBe(400);
    expect(loginResponse.text).toBe('One or more of the mandatory fields (email, password) have not been specified.');
  });

  it.each([
    ['should return 400 for no payload', {}], 
    ['should return 400 when missing email', {'password': '1234'}], 
    ['should return 400 when missing password', {'email': 'bobdoe@test.com'}]
  ])(
    '%s',
    async (_, payload) => {
      const loginResponse = await agent
    .post('/auth/login')
    .send(payload);

    expect(loginResponse.statusCode).toBe(400);
    expect(loginResponse.text).toBe('One or more of the mandatory fields (email, password) have not been specified.');
    }
  );
})
