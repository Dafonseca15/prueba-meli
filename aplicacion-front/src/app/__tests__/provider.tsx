// --- MOCKS ---

// Mock para ReactDOM.createRoot y su método render
const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));
jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock para AppRouter
jest.mock('../router', () => ({ // Asegúrate de que esta ruta sea correcta
  AppRouter: jest.fn(() => (
    <div data-testid="mock-AppRouter">Mock AppRouter Content</div>
  )),
}));

// Mock para React.StrictMode
// Esto es importante para que el test pueda verificar que AppRouter se renderiza dentro de él.
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    StrictMode: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-StrictMode">{children}</div>
    ),
  };
});

// Importa los mocks para poder limpiarlos
import { AppRouter } from '../router';

// --- FIN DE MOCKS ---

// Feature: Application Entry Point Rendering
describe("Feature: Application Entry Point Rendering", () => {
  let rootElement: HTMLElement | null;

  beforeEach(() => {
    // 1. Limpia los mocks antes de cada test
    mockCreateRoot.mockClear();
    mockRender.mockClear();
    (AppRouter as jest.Mock).mockClear();

    // 2. Prepara el DOM: Crea un div con id="root" en el body
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // 3. Espía document.getElementById para verificar que se llama
    jest.spyOn(document, 'getElementById').mockReturnValue(rootElement);
  });

  afterEach(() => {
    // Limpia el DOM después de cada test
    if (rootElement && document.body.contains(rootElement)) {
      document.body.removeChild(rootElement);
    }
    // Restaura el mock de getElementById
    jest.restoreAllMocks();
  });

  // Scenario: The application successfully mounts the root component
  describe("Scenario: The application successfully mounts the root component", () => {
    // Given: A root HTML element exists and ReactDOM/AppRouter are mocked (handled in beforeEach)

    it("When: the main.tsx file is executed, Then: document.getElementById should be called with 'root'", () => {
      // Importa el archivo main.tsx aquí para ejecutar su lógica
      // Esto simula que el script se carga en el navegador
      require('../provider'); // Asegúrate de que esta ruta sea correcta

      expect(document.getElementById).toHaveBeenCalledTimes(1);
      expect(document.getElementById).toHaveBeenCalledWith('root');
    });

    // it("And: ReactDOM.createRoot should be called with the root element", () => {
    //   require('../provider'); // Ejecuta main.tsx
    //   expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    //   expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    // });

    // it("And: the render method of the root should be called", () => {
    //   require('../provider'); // Ejecuta main.tsx
    //   expect(mockRender).toHaveBeenCalledTimes(1);
    //   // Verifica que se llamó con el elemento de React (StrictMode envolviendo AppRouter)
    //   expect(mockRender).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       $$typeof: Symbol.for('react.element'), // Verifica que es un elemento React
    //       type: expect.any(Function), // Espera que sea una función (StrictMode o AppRouter)
    //       props: expect.objectContaining({
    //         children: expect.objectContaining({
    //           $$typeof: Symbol.for('react.element'),
    //           type: expect.any(Function), // Espera que sea AppRouter
    //           props: {}, // AppRouter no recibe props directamente aquí
    //         }),
    //       }),
    //     })
    //   );
    // });
  });
});