const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: "./",
});

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

module.exports = createJestConfig(config);
