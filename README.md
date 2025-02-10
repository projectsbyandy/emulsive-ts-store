# Emulsive Store
The one stop location for all of your film needs

# Implementation
Typescript 
- with vite, react and shadcn for the store
- express for backend
    - Using HMAC (password handling) and jwt (auth)
    - Fake repo
    - Mongo repo
- Jest API tests
  - note to switch to using mocks set the environment variable `process.env.Emulsive_Fake` or update the `/api/appConfig.json`

# Start
- start full stack `npm run all`
- api only `npm run api`
- frontend only `npm run ui`
- tests `npm run tests`

## API Integration test notes
- various environment variables defined in `jest.env-variables.js` have been setup to enable the api to work with supertest
  - e.g. 
    - supertest will not handle transient cookies when the domain is set to localhost
    - tests are decoupled from external dependencies like db so use fakes

# External dependencies
- film product images are served from https://freeimage.host/