module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      "__Emulsive_Fake__": true,
       "__RCTProfileIsProfiling": false
    }],
  },
  setupFiles: [
    '<rootDir>/jest.env-variables.js'
  ]
};