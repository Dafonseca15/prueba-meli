import '@testing-library/jest-dom';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args.some((arg) => typeof arg === 'string' && arg.includes('Not implemented: navigation'))) {
    return;
  }
  originalConsoleError(...args);
};
