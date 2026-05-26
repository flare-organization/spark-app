
// Registers `toBeInTheDocument` and friends on Jest's `expect`.
// Must run AFTER the Jest env is built, which is why it's listed in
// `setupFilesAfterEnv` (not imported per test file).
import '@testing-library/jest-dom';

// react-router-dom v7 reads TextEncoder/TextDecoder at import time and
// jsdom doesn't ship them. Lazy-require from node:util so the file has no
// top-level named import.
const util = require('node:util') as typeof import('node:util');
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = util.TextEncoder as typeof globalThis.TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = util.TextDecoder as typeof globalThis.TextDecoder;
}
