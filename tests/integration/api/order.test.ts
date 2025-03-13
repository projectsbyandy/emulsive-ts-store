import request from 'supertest';
import mongoose from 'mongoose';
import { readFile } from '@/api/helpers/fileReader';
import { serverPromise, app } from '@/api/app';
import { performLogin } from './helpers/utils';
import { Order } from '@/api/types';

let server: any;
let consoleSpy: jest.SpyInstance
let capturedLogs: string[] = [];
const PATHS_TO_FAKE_DATA = ['.', 'src/api/fakedata', 'orders.json'];
const VALID_ORDER_REQUEST = {
  "data": {
    "name": "Bob Loon",
    "address": "12 Lendle Road, Northholt, London",
    "chargeTotal": 3816,
    "orderTotal": "£38.16",
    "cartItems": [
      {
        "cartId": "12",
        "productId": 12,
        "imageUrl": "https://iili.io/2iqmZZl.webp",
        "name": "Ultra Max",
        "price": "820",
        "quantity": 2,
        "manufacturer": "Kodak",
        "format": "35mm"
      },
      {
        "cartId": "7",
        "productId": 7,
        "imageUrl": "https://iili.io/2iqmm67.webp",
        "name": "Portra 200",
        "price": "1290",
        "quantity": 1,
        "manufacturer": "Kodak",
        "format": "35mm"
      }
    ],
    "numberItemsInCart": 3
  }
};

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

describe('Verify calling order endpoints with no auth returns 401', () => {

  it('should return 401 for get order with no auth', async () => {
    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)
    console.log(rawData);
    // Act
    const response = await request(app).get('/api/orders');

    // Assert
    expect(response.status).toBe(401);
    expect(capturedLogs).toContain('Session cookie not found');
  });

  it('should return 401 for create order with no auth', async () => {
    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)
    console.log(rawData);
    // Act
    const response = await request(app).post('/api/orders');

    // Assert
    expect(response.status).toBe(401);
    expect(capturedLogs).toContain('Session cookie not found');
  });
});

describe('Verify protected get orders', () => {
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

  it('should return back mock order data', async () => {
    // Arrange
    const rawData = await readFile(PATHS_TO_FAKE_DATA)

    // Act
    const response = await agent.get('/api/orders');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toStrictEqual(JSON.parse(rawData));
  });
})

describe('Verify protected create order', () => {
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

  it('should return order number 3 for a newly created order', async () => {
    // Arrange / Act
    const response = await agent.post('/api/orders').send(VALID_ORDER_REQUEST);

    // Assert
    expect(response.statusCode).toBe(201);

    const {message, order} = response.body;

    expect(message).toStrictEqual("Created Order");
    expect(order.orderId).toStrictEqual(3);
    expect(capturedLogs).toContain('Order successfully created');
  });

  it('should return a bad request if name and address are missing', async () => {
    // Arrange
    const newOrder = {
      "data": {
        "chargeTotal": 3816,
        "orderTotal": "£38.16",
        "cartItems": [
          {
            "cartId": "12",
            "productId": 12,
            "imageUrl": "https://iili.io/2iqmZZl.webp",
            "name": "Ultra Max",
            "price": "820",
            "quantity": 2,
            "manufacturer": "Kodak",
            "format": "35mm"
          },
          {
            "cartId": "7",
            "productId": 7,
            "imageUrl": "https://iili.io/2iqmm67.webp",
            "name": "Portra 200",
            "price": "1290",
            "quantity": 1,
            "manufacturer": "Kodak",
            "format": "35mm"
          }
        ],
        "numberItemsInCart": 3
      }
    };

    // Act
    const response = await agent.post('/api/orders').send(newOrder);

    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ "error": "One or more fields: name, address are missing" });
    expect(capturedLogs).toContain('One or more fields: name, address are missing');
  });

  it('should return a bad request if name is missing', async () => {
    // Arrange
    const newOrder = {
      "data": {
        "address": "12 Lendle Road, Northholt, London",
        "chargeTotal": 3816,
        "orderTotal": "£38.16",
        "cartItems": [
          {
            "cartId": "12",
            "productId": 12,
            "imageUrl": "https://iili.io/2iqmZZl.webp",
            "name": "Ultra Max",
            "price": "820",
            "quantity": 2,
            "manufacturer": "Kodak",
            "format": "35mm"
          },
          {
            "cartId": "7",
            "productId": 7,
            "imageUrl": "https://iili.io/2iqmm67.webp",
            "name": "Portra 200",
            "price": "1290",
            "quantity": 1,
            "manufacturer": "Kodak",
            "format": "35mm"
          }
        ],
        "numberItemsInCart": 3
      }
    };

    // Act
    const response = await agent.post('/api/orders').send(newOrder);

    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ "error": "One or more fields: name, address are missing" });
    expect(capturedLogs).toContain('One or more fields: name, address are missing');
  });

  it('should return a bad request if address is missing', async () => {
    // Arrange
    const newOrder = {
      "data": {
        "name": "Bob Loon",
        "chargeTotal": 3816,
        "orderTotal": "£38.16",
        "cartItems": [
          {
            "cartId": "12",
            "productId": 12,
            "imageUrl": "https://iili.io/2iqmZZl.webp",
            "name": "Ultra Max",
            "price": "820",
            "quantity": 2,
            "manufacturer": "Kodak",
            "format": "35mm"
          },
          {
            "cartId": "7",
            "productId": 7,
            "imageUrl": "https://iili.io/2iqmm67.webp",
            "name": "Portra 200",
            "price": "1290",
            "quantity": 1,
            "manufacturer": "Kodak",
            "format": "35mm"
          }
        ],
        "numberItemsInCart": 3
      }
    };

    // Act
    const response = await agent.post('/api/orders').send(newOrder);

    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ "error": "One or more fields: name, address are missing" });
    expect(capturedLogs).toContain('One or more fields: name, address are missing');
  });

  it('should should populate the order with the correct userId', async () => {
    // Arrange / Act

    const createOrderResponse = await agent.post('/api/orders').send(VALID_ORDER_REQUEST);
    expect(createOrderResponse.statusCode).toBe(201);
    const { order } = createOrderResponse.body;
    order as Order;

    // Assert
    expect(order.userId).toStrictEqual("679f961099319abc13a97ed3");
  });
});