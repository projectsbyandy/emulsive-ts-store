import request from 'supertest';
import mongoose from 'mongoose';
import { readFile } from '@/api/helpers/fileReader';
import { serverPromise, app } from '@/api/app';

let server: any;
let consoleSpy: jest.SpyInstance
let capturedLogs: string[] = [];

beforeAll(async () => { 
  server = await serverPromise;
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Verify usersNoAuth', () => {
  it('should return back mock data', async () => {

    // Arrange
    const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'users.json'];
    const rawData = await readFile(PATHS_TO_FAKE_DATA)

    // Act
    const response = await request(app).get('/usersNoAuth');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toStrictEqual(JSON.parse(rawData));
  });
});

describe('Verify protected /users', () => {
  let agent: request.SuperTest<request.Test>;

  beforeEach(async () => {
    capturedLogs = [];
    consoleSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      capturedLogs.push(args.join(' '));
    });

    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;

    const loginResponse = await agent
    .post('/auth/login')
    .send({
      'email': 'bobdoe@test.com',
      'password': '1234'
    });

    expect(loginResponse.statusCode).toBe(200);

  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
    consoleSpy.mockRestore();
  });
  
  it('should return back mock data for a logged in user', async () => {
    // Arrange
    const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'users.json'];
    const rawData = await readFile(PATHS_TO_FAKE_DATA)
    
    // Act
    const response = await agent.get('/users');
        
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toStrictEqual(JSON.parse(rawData));
  });

  it('should return 404 for non-logged in user', async () => {
    // Arrange / Act
    const response = await request(app).get('/users');

    // Assert
    expect(response.status).toBe(401);
    expect(capturedLogs).toContain('Session cookie not found');
  });
})

