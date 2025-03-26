module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/tests/endtoend/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/tests/integration/**/*.test.[jt]s?(x)'
  ],
  transform: {
    '^<rootDir>/tests/integration/.+api\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json',
      "__Emulsive_Fake__": true,
       "__RCTProfileIsProfiling": false
    }],
  },
  setupFiles: [
    '<rootDir>/jest.env-variables.js'
  ]
};