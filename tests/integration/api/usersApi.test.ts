import request from 'supertest';
import mongoose from 'mongoose';
import { readFile } from '@/api/helpers/fileReader';
import { serverPromise, app } from '@/api/app';
import { performLogin, performRegistration } from './helpers/utils';
import { User } from '@/api/types';

let server: any;
let consoleSpy: jest.SpyInstance
let capturedLogs: string[] = [];
const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'users.json'];

beforeAll(async () => { 
  server = await serverPromise;
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

beforeEach(async () => {
  capturedLogs = [];
  consoleSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
    capturedLogs.push(args.join(' '));
  });
});

afterEach(async () => {
  consoleSpy.mockRestore();

  if (server) {
    await server.close();
  }
});

describe('Verify usersNoAuth', () => {
  it('should return back mock data', async () => {

    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)

    // Act
    const response = await request(app).get('/api/usersNoAuth');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
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

    await performLogin(agent, 'bobdoe@test.com', '1234');
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
  });
  
  it('should return back mock data for a logged in user', async () => {
    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)
    
    // Act
    const response = await agent.get('/api/users');
        
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toStrictEqual(JSON.parse(rawData));
  });

  it('should return 404 for non-logged in user', async () => {
    // Arrange / Act
    const response = await request(app).get('/api/users');

    // Assert
    expect(response.status).toBe(401);
    expect(capturedLogs).toContain('Session cookie not found');
  });
})

describe('Verify protected Delete /User', ()=> {
  let agent: request.SuperTest<request.Test>;
  
  beforeEach(async () => {
    capturedLogs = [];
    consoleSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
      capturedLogs.push(args.join(' '));
    });

    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
  });

  it('should return a 401 if not logged in', async ()=> {

    // Arrange / Act
    const response = await request(app).delete('/api/user/thisIdDoesNoExist');

    // Assert
    expect(response.statusCode).toBe(401);
    expect(capturedLogs).toContain('Session cookie not found');
  });

  it('should return a 404 if authenticated delete is called without a userId', async ()=> {

    // Arrange
    await performLogin(agent, 'bobdoe@test.com', '1234');
    
    // Act
    const deleteResponse = await agent.delete('/api/user');

    // Assert
    expect(deleteResponse.statusCode).toBe(404);
    expect(deleteResponse.text).toContain('Cannot DELETE /api/user');
  });

  it('should return a 403 if authenticated delete is called with an invalid userId', async ()=> {
    // Arrange
    await performLogin(agent, 'bobdoe@test.com', '1234');
    const id = 1313131

    // Act
    const deleteResponse = await agent.delete(`/api/user/${id}`);

    // Assert
    expect(deleteResponse.statusCode).toBe(403);
    expect(deleteResponse.text).toContain('Problem with request');
    expect(capturedLogs).toContain(`Logged in user is not authorized to delete user: ${id}`);
  });

  it('should not be able to delete a user if not logged in as that user', async ()=> {
    // Arrange
    await performLogin(agent, 'bobdoe@test.com', '1234');
    const userResponse = await agent.get('/api/users');

    const users: User[]= userResponse.body;
    const idForExistingUser = users.find(user => user.email === 'bobdoe@test.com')?.userId;
    
    await performRegistration(agent, "larry.p@test.com", "test", "Larry Parker");
    await performLogin(agent, "larry.p@test.com", "test");

    // Act
    const deleteResponse = await agent.delete(`/api/user/${idForExistingUser}`);

    // Assert
    expect(deleteResponse.statusCode).toBe(403);
    expect(deleteResponse.text).toContain('Problem with request');
    expect(capturedLogs).toContain(`Logged in user is not authorized to delete user: ${idForExistingUser}`);
  });

  it('should be able to delete a user if logged in as that user', async ()=> {
    // Arrange
    await performRegistration(agent, "larry.p@test.com", "test", "Larry Parker");
    await performLogin(agent, "larry.p@test.com", "test");
    const userResponse = await agent.get('/api/users');

    const users: User[]= userResponse.body;
    const idForRegisteredUser = users.find(user => user.email === 'larry.p@test.com')?.userId;

    await performLogin(agent, "larry.p@test.com", "test");

    // Act
    const deleteResponse = await agent.delete(`/api/user/${idForRegisteredUser}`);

    // Assert
    expect(deleteResponse.statusCode).toBe(204);
    expect(capturedLogs).toContain(`Deleted user with id: ${idForRegisteredUser}`);
  });
});

describe('Verify Get with Id', () => {
  let agent: request.SuperTest<request.Test>;

  beforeEach(async () => {
    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
  });

  it('should return back data with valid Id', async () => {
    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)
    const mockUsers: User[] = JSON.parse(rawData);
    const mockUser = mockUsers[0];

    await performLogin(agent, 'bobdoe@test.com', '1234');

    // Act
    const response = await agent.get(`/api/user/${mockUser.userId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockUser);
  });

  it('should return 404 with invalid Id', async () => {
    // Arrange
    await performLogin(agent, 'bobdoe@test.com', '1234');

    // Act
    const response = await agent.get(`/api/user/11318`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.text).toBe(`User with id: 11318 not found`)
  });
});

describe('Verify User filtering options', () => {
  let agent: request.SuperTest<request.Test>;

  beforeEach(async () => {
    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
  });

  it.each([
    ['should 0 users when active is false', "false", 0], 
    ['should 2 user when active is true', "true", 2]
  ])(
    '%s',
    async (_, isActive, expectedUserCount) => {
      await performLogin(agent, 'bobdoe@test.com', '1234');
      const usersResponse = await agent.get(`/api/users?active=${isActive}`);

    expect(usersResponse.statusCode).toBe(200);

    let users : User[] = usersResponse.body;

    expect(users.length).toBe(expectedUserCount);
    }
  );
});
