  // Override config with flag to force fake
  process.env.Emulsive_Fake = 'false';
  // supertest will not send cookies to localhost domains - use 127.0.0.1
  process.env.Emulsive_Cookies_Test = 'true';
  // do not set an app port when in test to avoid conflicts
  process.env.NODE_ENV = 'test';