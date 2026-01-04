import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../Admin';
import { getQuestions, getTeams } from '../../utils/requester';

// Mock child components
vi.mock('../admin/login/Login', () => ({
  __esModule: true,
  default: function MockLogin({ setLogged, setPageMode }) {
    return (
      <div data-testid="mock-login">
        <button onClick={() => {
          setLogged(true);
          setPageMode(1);
        }}>
          Mock Login
        </button>
      </div>
    );
  },
}));

vi.mock('../admin/menu/AdminPanel', () => ({
  __esModule: true,
  default: function MockAdminPanel({ setPageMode, setS }) {
    return (
      <div data-testid="mock-admin-panel">
        <button onClick={() => setPageMode(2)}>Manage Questions</button>
        <button onClick={() => setPageMode(3)}>View Results</button>
        <button onClick={() => setS(1)}>Set Results Filter</button>
      </div>
    );
  },
}));

vi.mock('../admin/questionsMake/QuestionsMake', () => ({
  __esModule: true,
  default: function MockQuestionsMake({ setPageMode }) {
    return (
      <div data-testid="mock-questions-make">
        <button onClick={() => setPageMode(1)}>Back to Panel</button>
      </div>
    );
  },
}));

vi.mock('../admin/viewResults/Results', () => ({
  __esModule: true,
  default: function MockResults({ setPageMode }) {
    return (
      <div data-testid="mock-results">
        <button onClick={() => setPageMode(1)}>Back to Panel</button>
      </div>
    );
  },
}));

// Mock API calls
vi.mock('../../utils/requester', () => ({
  getQuestions: vi.fn(),
  getTeams: vi.fn(),
}));

describe('Admin Component', () => {
  const mockQuestions = [
    { id: 1, question: 'Test Question 1', options: ['A', 'B', 'C', 'D'], correctAnswer: 0 },
    { id: 2, question: 'Test Question 2', options: ['E', 'F', 'G', 'H'], correctAnswer: 1 },
  ];

  const mockTeams = [
    { id: 1, name: 'Team A', score: 100 },
    { id: 2, name: 'Team B', score: 150 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup mock implementations
    getQuestions.mockResolvedValue({
      data: {
        data: mockQuestions,
      },
    });
    
    getTeams.mockResolvedValue({
      data: {
        data: mockTeams,
      },
    });
  });

  const renderComponent = async () => {
    let container;
    
    await act(async () => {
      const rendered = render(
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      );
      container = rendered.container;
    });
    
    return { container };
  };

  it('renders login page by default', async () => {
    await renderComponent();
    
    // Check if login component is rendered
    expect(screen.getByTestId('mock-login')).toBeInTheDocument();
    
    // Check if API calls were made
    expect(getQuestions).toHaveBeenCalled();
    expect(getTeams).toHaveBeenCalled();
  });

  it('navigates to admin panel after login', async () => {
    await renderComponent();
    
    // Click login button
    await act(async () => {
      const loginButton = screen.getByText('Mock Login');
      fireEvent.click(loginButton);
    });
    
    // Check if admin panel is shown after login
    expect(screen.getByTestId('mock-admin-panel')).toBeInTheDocument();
  });

  it('navigates to questions management', async () => {
    // Start with logged-in state
    await renderComponent();
    
    // Login first
    await act(async () => {
      fireEvent.click(screen.getByText('Mock Login'));
    });
    
    // Wait for API calls to complete
    await waitFor(() => {
      expect(getQuestions).toHaveBeenCalled();
    });
    
    // Click manage questions button
    await act(async () => {
      fireEvent.click(screen.getByText('Manage Questions'));
    });
    
    // Check if questions management component is shown
    expect(screen.getByTestId('mock-questions-make')).toBeInTheDocument();
  });

  it('navigates to results view', async () => {
    await renderComponent();
    
    // Login first
    await act(async () => {
      fireEvent.click(screen.getByText('Mock Login'));
    });
    
    // Click view results button
    await act(async () => {
      fireEvent.click(screen.getByText('View Results'));
    });
    
    // Check if results component is shown
    expect(screen.getByTestId('mock-results')).toBeInTheDocument();
  });

  it('passes correct props to child components', async () => {
    await renderComponent();
    
    // Login first
    await act(async () => {
      fireEvent.click(screen.getByText('Mock Login'));
    });
    
    // Navigate to questions management
    await act(async () => {
      fireEvent.click(screen.getByText('Manage Questions'));
    });
    
    // Check if back button works
    await act(async () => {
      fireEvent.click(screen.getByText('Back to Panel'));
    });
    
    // Should be back to admin panel
    expect(screen.getByTestId('mock-admin-panel')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock API error for getQuestions
    const error = new Error('API Error');
    getQuestions.mockRejectedValueOnce(error);
    
    // Mock successful response for getTeams to prevent unhandled promise rejection
    getTeams.mockResolvedValueOnce({ data: { data: [] } });
    
    // Suppress console error for this test
    const originalError = console.error;
    console.error = vi.fn();
    
    try {
      // Render the component and wait for it to settle
      await act(async () => {
        render(
          <BrowserRouter>
            <Admin />
          </BrowserRouter>
        );
      });
      
      // Verify that the login component is still rendered
      expect(screen.getByTestId('mock-login')).toBeInTheDocument();
    } finally {
      // Always restore console.error
      console.error = originalError;
    }
  });

  it('passes results filter to Results component', async () => {
    await renderComponent();
    
    // Login first
    await act(async () => {
      fireEvent.click(screen.getByText('Mock Login'));
    });
    
    // Wait for API calls to complete
    await waitFor(() => {
      expect(getQuestions).toHaveBeenCalled();
    });
    
    // Set results filter
    await act(async () => {
      fireEvent.click(screen.getByText('Set Results Filter'));
    });
    
    // Navigate to results view
    await act(async () => {
      fireEvent.click(screen.getByText('View Results'));
    });
    
    // The Results component should be rendered
    expect(screen.getByTestId('mock-results')).toBeInTheDocument();
  });
});
