import { AppRouter } from '../router';

const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));
jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

jest.mock('../router', () => ({
  AppRouter: jest.fn(() => <div data-testid="mock-AppRouter">Mock AppRouter Content</div>),
}));

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    StrictMode: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-StrictMode">{children}</div>
    ),
  };
});

describe('Feature: Application Entry Point Rendering', () => {
  let rootElement: HTMLElement | null;

  beforeEach(() => {
    mockCreateRoot.mockClear();
    mockRender.mockClear();
    (AppRouter as jest.Mock).mockClear();

    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    jest.spyOn(document, 'getElementById').mockReturnValue(rootElement);
  });

  afterEach(() => {
    if (rootElement && document.body.contains(rootElement)) {
      document.body.removeChild(rootElement);
    }
    jest.restoreAllMocks();
  });

  describe('Scenario: The application successfully mounts the root component', () => {
    it("When: the main.tsx file is executed, Then: document.getElementById should be called with 'root'", () => {
      require('../provider');

      expect(document.getElementById).toHaveBeenCalledTimes(1);
      expect(document.getElementById).toHaveBeenCalledWith('root');
    });
  });
});
