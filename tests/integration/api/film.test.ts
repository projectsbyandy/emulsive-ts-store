import { app, serverPromise } from '@/api/app';
import { readFile } from '@/api/helpers/fileReader';
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
    expect(response.status).toBe(200);

    var filmsResponse : FilmsResponse = response.body;
    
    // Assert

    expect(filmsResponse.meta.formats).toStrictEqual(['all', '35mm', '120mm'])
    expect(filmsResponse.meta.manufacturers).toStrictEqual(["all", "Kodak", "Ilford", "Kentmere", "Cinestill", "Rollei"]);
  });

  //TODO: Fix featured flag
  it.each([
    ['should return featured films with flag on', "true"], 
    ['should return featured films with flag off', "false"]
  ])(
    '%s',
    async (_, isFeatured) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?featured=${isFeatured}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;

      // Assert
      expect(filmsResponse.data.every(film => film.attributes.featured === Boolean(isFeatured))).toBe(true);
    }
  );

  it.each([
    ['should return items with Kodak in the name, description or manufacturer', "kodak", 5],
    ['should return items with Cinestill in the name, description or manufacturer', "Cinestill", 1],
    ['should return items with case-insensitive cinestill in the name, description or manufacturer', "cinestill", 1], 
    ['should return items with best-selling in the name, description or manufacturer', "best-selling", 1]
    ])(
    '%s',
    async (_, keyword, expectedCount) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?keyword=${keyword}`)

      var filmsResponse : FilmsResponse = response.body;

      // Assert
      keyword = keyword.toLocaleLowerCase();

      expect(response.statusCode).toBe(200);
      expect(filmsResponse.data.length).toBe(expectedCount);
      expect(filmsResponse.data.every(film => 
        film.attributes.name.toLocaleLowerCase().includes(keyword) || 
        film.attributes.description.toLocaleLowerCase().includes(keyword) || 
        film.attributes.manufacturer.toLocaleLowerCase().includes(keyword))).toBe(true);
    }
  );

  it.each([
    ['should return items with format of 35mm', "35mm"],
    ['should return items with format of 120mm', "120mm"],
    ])(
    '%s',
    async (_, format) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?format=${format}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;

      // Assert
      expect(filmsResponse.data.every(film => film.attributes.format === format)).toBe(true);
    }
  );

  it('should return all items when format is set to all', async () => {
     // Arrange / Act
     const response = await agent.get('/api/films?format=all')
     expect(response.statusCode).toBe(200);

     var filmsResponse : FilmsResponse = response.body;

     // Assert
     expect(filmsResponse.data.every(film => ["35mm", "120mm"].includes(film.attributes.format))).toBe(true);
  });

  it.each([
    ['should filter on price - highest-first - less than or equal to 1000p', 1000, 4],
    ['should filter on price - highest-first - less than or equal to 700p', 700, 1],
    ])(
    '%s',
    async (_, price, expectedItemCount) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?price=${price}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;
      
      // Assert
      expect(filmsResponse.data.length).toBe(expectedItemCount)

      const isSortedGreatestFirst = filmsResponse.data.every((film, index, array) => {
        return index === 0 || film.attributes.price <=  array[index - 1].attributes.price;
      });
      
      expect(isSortedGreatestFirst).toBe(true);
    }
  );

  it('should filter for on-sale - on', async () => {
    // Arrange / Act
    const response = await agent.get(`/api/films?onsale=on`)
    expect(response.statusCode).toBe(200);

    var filmsResponse : FilmsResponse = response.body;
    
    // Assert
    expect(filmsResponse.data.length).toBe(2);
    expect(filmsResponse.meta.pagination.total).toBe(2);
    expect(filmsResponse.data.every(film => film.attributes.onSale === true)).toBe(true);
  });

  it('should return paginated all when on-sale is set to off', async () => {
    // Arrange / Act
    const response = await agent.get(`/api/films?onsale=off`)
    expect(response.statusCode).toBe(200);

    var filmsResponse : FilmsResponse = response.body;
    
    // Assert
    expect(filmsResponse.data.length).toBe(5);
    expect(filmsResponse.meta.pagination.total).toBe(11);
    expect(filmsResponse.data.every(film => typeof(film.attributes.onSale) === 'boolean')).toBe(true);
  });

  it.each([
    ['should filter by the Kodak manufacturer', 'Kodak', 7],
    ['should filter by the Ilford manufacturer', 'Ilford', 1],
    ['should filter by the Kentmere manufacturer', 'Kentmere', 1],
    ])(
    '%s',
    async (_, manufacturer, total) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?manufacturer=${manufacturer}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;
      
      // Assert
      expect(filmsResponse.meta.pagination.total).toBe(total);
      expect(filmsResponse.data.every(film => film.attributes.manufacturer === manufacturer)).toBe(true);
    }
  );

  it.each([
    ['should paginate correctly based on keyword - cinestill', 'cinestill', 1, 1, 1],
    ['should paginate correctly based on keyword - kodak', 'kodak', 1, 2, 7],
    ['should paginate correctly based on no keyword', '', 1, 3, 11],
    ])(
    '%s',
    async (_, keyword, page, pageCount, total) => {

      // Arrange / Act
      const response = await agent.get(`/api/films?keyword=${keyword}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;
      
      // Assert
      expect(filmsResponse.meta.pagination.page).toBe(page);
      expect(filmsResponse.meta.pagination.pageSize).toBe(5);
      expect(filmsResponse.meta.pagination.pageCount).toBe(pageCount);
      expect(filmsResponse.meta.pagination.total).toBe(total);
    }
  );
  
  it.each([
    ['should display the correct results when the first page is specified', 1, 0, 5],
    ['should display the correct results when the second page is specified', 2, 5, 10],
    ['should display the correct results when the third page is specified', 3, 10, 11],
    ])(
    '%s',
    async (_, pageNumber, startRange, endRange) => {

      // Arrange
      const expectedFilmsForPage = mockFilms.data.slice(startRange, endRange);
      
      // Act
      const response = await agent.get(`/api/films?page=${pageNumber}`)
      expect(response.statusCode).toBe(200);

      var filmsResponse : FilmsResponse = response.body;
      
      // Assert
      expect(filmsResponse.data).toStrictEqual(expectedFilmsForPage);
    }
  );
});