// rootDir is relative to this config file, so '../..' points back at the
// frontend project root. All <rootDir>/... paths below resolve from there.
/** @type {import('jest').Config} */
module.exports = {
  rootDir: '../..',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          verbatimModuleSyntax: false,
          erasableSyntaxOnly: false,
          types: ['jest', 'node', 'vite/client', '@testing-library/jest-dom'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
