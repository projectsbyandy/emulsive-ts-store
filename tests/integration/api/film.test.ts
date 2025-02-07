import { app, serverPromise } from '@/api/app';
import { readFile } from '@/api/helpers/fileReader';
//import films from '@/api/router/films';
import { FilmsResponse } from '@/api/types';
import mongoose from 'mongoose';
import request from 'supertest';

let server: any;
const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'films.json'];
let mockFilms: FilmsResponse;

beforeAll(async () => { 
  server = await serverPromise;
  mockFilms = JSON.parse(await readFile(PATHS_TO_FAKE_DATA));
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});


describe('Verify get /api/films with mocks', () => {
  let agent: request.SuperTest<request.Test>;

  beforeEach(async () => {
    agent = request.agent(app) as unknown as request.SuperTest<request.Test>;
  });

  afterEach(() => {
    agent = null as unknown as request.SuperTest<request.Test>;
  });

  it('should return first 5 paginated mock films', async () => {

    // Arrange / Act
    const response = await agent.get('/api/films');

    // Assert
    expect(response.status).toBe(200);

    var filmsResponse : FilmsResponse = response.body;
    expect(filmsResponse.data).toStrictEqual(mockFilms.data.slice(0, 5));

    expect(filmsResponse.meta.formats).toStrictEqual(['all', '35mm', '120mm'])
  });

  it('should return the correct default paginated metadata mock films', async () => {

    // Arrange / Act
    const response = await agent.get('/api/films');

    // Assert
    expect(response.status).toBe(200);

    var filmsResponse : FilmsResponse = response.body;

    expect(filmsResponse.meta.pagination.page).toBe(1);
    expect(filmsResponse.meta.pagination.pageCount).toBe(Math.ceil(mockFilms.data.length / 5));
    expect(filmsResponse.meta.pagination.pageSize).toBe(5);
    expect(filmsResponse.meta.pagination.total).toBe(mockFilms.data.length);
  });

  it('should return the correct default format and manufacturers mock films', async () => {

    // Arrange / Act
    const response = await agent.get('/api/films');

    // Assert
    expect(response.status).toBe(200);

    var filmsResponse : FilmsResponse = response.body;

    expect(filmsResponse.meta.formats).toStrictEqual(['all', '35mm', '120mm'])
    expect(filmsResponse.meta.manufacturers).toStrictEqual(["all", "Kodak", "Ilford", "Kentmere", "Cinestill", "Rollei"]);
  });

  it.each([
    ['should return featured films with flag on', "true"], 
    ['should return featured films with flag off', "false"]
  ])(
    '%s',
    async (_, isFeatured) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?featured=${isFeatured}`)

      var filmsResponse : FilmsResponse = response.body;

      // Assert
      expect(response.statusCode).toBe(200);
      expect(filmsResponse.data.every(film => film.attributes.featured === Boolean(isFeatured))).toBe(true);
    }
  );
});