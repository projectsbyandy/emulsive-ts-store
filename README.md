# Emulsive Store
The one stop location for all of your film needs. 

<img src="./src/assets/emulsivestore.png" alt="screenshot" width="600"/>

# Implementation
Tests
- API integration tests using Supertest and Jest
- E2E tests using playwright

Front and Backend 
- with vite, react and shadcn for the store
- express for backend
    - Using HMAC (password handling) and jwt (auth)
    - Fake repo
    - Mongo repo
- Jest API tests
  - note to switch to using mocks set the environment variable `process.env.Emulsive_Fake` or update the `/api/appConfig.json`

# Setup
1. From the location `emulsive-store`
2. Run `npm install`

# Start
- start full stack `npm run all`
  - If there are any issues with running concurrently install globally `npm i -g concurrently`
- api only `npm run api`
- frontend only `npm run ui`
- tests `npm run tests`

## API Integration test notes
- various environment variables defined in `jest.env-variables.js` have been setup to enable the api to work with supertest
  - e.g. 
    - supertest will not handle transient cookies when the domain is set to localhost
    - tests are decoupled from external dependencies like db so use fakes
- only jest tests within the `tests/integration` directory and must have `.api.test.ts` extension will be picked up.

## E2E Integration test notes
- `/tests/e2e`
[Link to e2e test Readme](./tests/e2e/README.md)

## Performance Testing
- `/tests/performance`
- Using K6 implementation of performance tests with checks that could be included for functional testing
- SLAs are defined in the config files
- Examples of test scenario to target each api endpoint. There is also a mixture test which combines the scenarios with ramping, variable load and durations. 

### Running a test
- navigate to `/tests/performance`
- run cmd `k6 run -e ENV=<environment-to-target> <relative-path-to-test>` e.g. to target local emulsive api e.g. `k6 run -e ENV=local mixed/filmsAndAuth.ts`

## Config support
The api uses config values defined in `apiConfig.json`

To read load the config
```typescript
const config = await getApiConfig();
```

The front end uses config handling built into Vite. Please see Testing notes section for note details.

## Testing notes
Added support for delaying rendering of UI to enable more synchronization testing scenarios.

By default the vite runs in QA mode as defined in `vite.config.ts`

The store configs are stored in the folder `storeConfig`. In order for variables to be made available to Vite, they should be prefixed with VITE e.g. VITE_QA_TEST_DELAY

To use the variables
```typescript
  if (import.meta.env.VITE_QA_TEST_DELAY)
    await Sleep(1000);
```

# External dependencies
- film product images are served from https://freeimage.host/