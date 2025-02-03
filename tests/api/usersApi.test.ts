import request from 'supertest';
import mongoose from 'mongoose';
import { readFile } from '@/api/helpers/fileReader';
import { serverPromise, app } from '@/api/app';

let server: any; 

// Override config with flag to force fake
process.env.Emulsive_Fake = 'true';

beforeAll(async () => { 
  server = await serverPromise;
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('GET usersNoAuth', () => {
  it('should return back mock data', async () => {

    // Arrange
    const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'users.json'];
    const rawData = await readFile(PATHS_TO_FAKE_DATA)

    const response = await request(app).get('/usersNoAuth');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toStrictEqual(JSON.parse(rawData));
  });
});

