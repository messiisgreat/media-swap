import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

module.exports = createJestConfig(config);
