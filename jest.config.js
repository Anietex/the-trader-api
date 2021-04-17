module.exports = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': ['ts-jest'],
  },
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node,'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!variables/.*)',
    '/node_modules/(?!crypto-random-string)',
  ],
};
