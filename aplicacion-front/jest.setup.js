
import '@testing-library/jest-dom';// jest.setup.js (o jest.setup.ts)

// Polyfill para TextEncoder y TextDecoder
// Esto es necesario para algunas librerías (como react-router-dom) que usan estas APIs web en entornos Node.js.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

// Suprime el error específico de JSDOM 'Not implemented: navigation'
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args.some(arg => typeof arg === 'string' && arg.includes('Not implemented: navigation'))) {
    return; // No hagas nada si el error contiene el mensaje específico
  }
  originalConsoleError(...args); // Si no es el error que queremos suprimir, imprime normalmente
};
