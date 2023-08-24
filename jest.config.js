export default  {
    preset: "ts-jest",
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    // the following line is needed in order to grab modules from the
    // src folder without the need to write them relatively
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
    moduleDirectories: ["node_modules", "<rootdir>/src"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      '\\.(css|less|sass|scss)$': '<rootDir>/src/tests/__mocks__/styleMock.js',
    },
  };