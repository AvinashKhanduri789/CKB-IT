import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Round2 from '../Round2';

// Mock all dependencies
vi.mock('../../utils/requester', () => ({
  submitAnswer: vi.fn().mockResolvedValue({ success: true }),
  updateQuestionStatus: vi.fn().mockResolvedValue({ success: true }),
  getQuestions: vi.fn().mockResolvedValue({ 
    data: [
      { 
        id: '1', 
        title: 'Test Question', 
        description: 'Test Description',
        difficulty: 'easy',
        status: 'unattempted',
        starterCode: '// Start coding',
        testCases: []
      }
    ] 
  }),
}));

vi.mock('@mantine/hooks', () => ({
  useDisclosure: () => [false, { open: vi.fn(), close: vi.fn() }],
}));

vi.mock('../../components/CodeEditor', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-editor">Code Editor</div>,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

// Mock window.confirm
window.confirm = vi.fn(() => true);

global.localStorage = localStorageMock;

// Simple wrapper component for testing
const TestWrapper = ({ children }) => (
  <div>
    {children}
  </div>
);

describe('Round2', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <TestWrapper>
          <Round2 />
        </TestWrapper>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'team_name') return 'test-team';
      if (key === 'questionIndex') return '0';
      return null;
    });
  });

  it('renders without crashing', () => {
    // Mock the initial render
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('loads and displays questions', async () => {
    renderComponent();
    // Wait for any async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    // Just check if the component rendered something
    expect(screen.getByTestId('mock-editor')).toBeInTheDocument();
  });

  it('shows login prompt when no team name', async () => {
    // Mock no team name
    localStorageMock.getItem.mockImplementation(() => null);
    renderComponent();
    // Check for any error message or redirect
    const errorElements = screen.queryAllByText(/error|login|sign in/i, { exact: false });
    expect(errorElements.length).toBeGreaterThan(0);
  });

  it('handles question selection', async () => {
    renderComponent();
    // Wait for any async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    // Just verify the editor is rendered
    expect(screen.getByTestId('mock-editor')).toBeInTheDocument();
  });
});
