import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import InGame from '../InGame';
import { formatTime } from '../../../../utils/helpers';

// Mock the formatTime helper
vi.mock('../../../../utils/helpers', () => ({
  formatTime: vi.fn().mockImplementation((seconds) => `00:${seconds < 10 ? '0' + seconds : seconds}`),
}));

// Mock the CustomAlert component
vi.mock('../../../../components/CustomAlert', () => ({
  __esModule: true,
  default: function MockAlert({ message, onYes, onNo }) {
    return (
      <div data-testid="mock-alert">
        <div>{message}</div>
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    );
  },
}));

describe('InGame Component', () => {
  const mockQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 1
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1
    }
  ];

  const defaultProps = {
    teamName: 'Test Team',
    questions: mockQuestions,
    answers: Array(mockQuestions.length).fill(null),
    setAnswers: vi.fn(),
    timers: Array(mockQuestions.length).fill(0),
    setTimers: vi.fn(),
    questionIndex: 0,
    setQuestionIndex: vi.fn(),
    setGameMode: vi.fn(),
    totalTimer: 300, // 5 minutes
    setTotalTimer: vi.fn(),
    attempts: Array(mockQuestions.length).fill(false),
    setAttempts: vi.fn(),
    showAlert: false,
    setShowAlert: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with initial state', () => {
    render(<InGame {...defaultProps} />);
    
    // Check if team name is displayed
    expect(screen.getByText('Team Test Team')).toBeInTheDocument();
    
    // Check if the first question is displayed
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    
    // Check if all options are rendered
    expect(screen.getByLabelText('London')).toBeInTheDocument();
    expect(screen.getByLabelText('Paris')).toBeInTheDocument();
    expect(screen.getByLabelText('Berlin')).toBeInTheDocument();
    expect(screen.getByLabelText('Madrid')).toBeInTheDocument();
    
    // Check if the question counter is correct
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('handles option selection', () => {
    render(<InGame {...defaultProps} />);
    
    // Find the option container that contains 'Paris' text
    const optionText = screen.getByText('Paris');
    const optionContainer = optionText.closest('div[role="radio"]') || optionText.closest('div');
    
    // Click on the option
    fireEvent.click(optionContainer);
    
    // Check if setAnswers was called
    expect(defaultProps.setAnswers).toHaveBeenCalled();
    
    // Check if attempts was updated
    expect(defaultProps.setAttempts).toHaveBeenCalled();
  });

  it('navigates between questions', () => {
    // Mock the setQuestionIndex to track calls
    const mockSetQuestionIndex = vi.fn();
    const props = {
      ...defaultProps,
      setQuestionIndex: mockSetQuestionIndex
    };
    
    render(<InGame {...props} />);
    
    // Click next button
    const nextButton = screen.getByText('Next →');
    fireEvent.click(nextButton);
    
    // Check if setQuestionIndex was called
    expect(mockSetQuestionIndex).toHaveBeenCalled();
    
    // Check if timer was updated
    expect(defaultProps.setTotalTimer).toHaveBeenCalled();
  });

  it('shows submit confirmation on last question', () => {
    const props = {
      ...defaultProps,
      questionIndex: 1, // Last question
    };
    
    render(<InGame {...props} />);
    
    // Click next button (which should show submit confirmation)
    const submitButton = screen.getByText('Submit Answers');
    fireEvent.click(submitButton);
    
    // Check if setShowAlert was called to show the confirmation dialog
    expect(defaultProps.setShowAlert).toHaveBeenCalledWith(true);
  });

  it('handles question navigation via question list', () => {
    render(<InGame {...defaultProps} />);
    
    // Click on question 2 in the question list
    const question2 = screen.getByText('Q2');
    fireEvent.click(question2);
    
    // Check if setQuestionIndex was called with the correct index
    expect(defaultProps.setQuestionIndex).toHaveBeenCalledWith(1);
  });

  it('shows alert when trying to submit', () => {
    const props = {
      ...defaultProps,
      showAlert: true,
    };
    
    render(<InGame {...props} />);
    
    // Check if the alert is shown
    expect(screen.getByTestId('mock-alert')).toBeInTheDocument();
    
    // Click Yes on the alert
    fireEvent.click(screen.getByText('Yes'));
    
    // Check if setGameMode was called to proceed to the next screen
    expect(defaultProps.setGameMode).toHaveBeenCalledWith(3);
  });

  it('prevents going back from the first question', () => {
    render(<InGame {...defaultProps} questionIndex={0} />);
    
    // The previous button should be disabled on the first question
    const prevButton = screen.getByText('← Previous');
    expect(prevButton).toBeDisabled();
  });

  it('updates timer every second', () => {
    vi.useFakeTimers();
    
    render(<InGame {...defaultProps} />);
    
    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);
    
    // Check if setTotalTimer was called at least once
    expect(defaultProps.setTotalTimer).toHaveBeenCalled();
    
    // Cleanup
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('shows correct progress summary', () => {
    const props = {
      ...defaultProps,
      attempts: [true, false], // First question attempted
      answers: [1, null], // First question answered with option 1 (Paris)
    };
    
    render(<InGame {...props} />);
    
    // Check progress summary
    expect(screen.getByText('Attempted: 1/2')).toBeInTheDocument();
    expect(screen.getByText('Remaining: 1/2')).toBeInTheDocument();
    
    // Find the progress bar by its parent's class and check its style
    const progressBarContainer = screen.getByText('Progress Summary').parentElement;
    const progressBar = progressBarContainer.querySelector('div[style*="width:"]');
    expect(progressBar).toHaveStyle('width: 50%');
  });
});
