import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   moduleNameMapper: {
//     "\\.(css|scss)$": "identity-obj-proxy",
//   },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
};

export default config;
