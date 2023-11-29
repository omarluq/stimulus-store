module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  reporters: ['default', 'jest-junit'],
  coverageDirectory: 'docs/jest-stare/coverage',
  collectCoverage: true
}
