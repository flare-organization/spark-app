// rootDir is relative to this config file, so '../..' points back at the
// frontend project root. All <rootDir>/... paths below resolve from there.
import { TextEncoder, TextDecoder } from 'node:util';
import type { Config } from 'jest';

const config: Config = {
  rootDir: '../..',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globals: {
    TextEncoder,
    TextDecoder,
  },
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

export default config;
