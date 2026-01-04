import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CodeEditor from '../CodeEditor';

// Mock the Monaco Editor properly
vi.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: function MonacoEditor({ value, onChange, language, height, options }) {
    return (
      <div data-testid="mock-editor" data-language={language} data-height={height}>
        <textarea
          data-testid="editor-textarea"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <div data-testid="editor-options">
          {options?.minimap?.enabled ? 'minimap-enabled' : 'minimap-disabled'}
          {options?.fontSize && `font-size-${options.fontSize}`}
        </div>
      </div>
    );
  },
  Editor: function Editor() {
    return <div>Mock Editor</div>;
  }
}));

describe('CodeEditor', () => {
  const mockSetValue = vi.fn();
  const defaultProps = {
    value: '// initial code',
    setValue: mockSetValue,
    selectedLanguage: 'javascript',
  };

  const renderComponent = (props = {}) => {
    return render(<CodeEditor {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    mockSetValue.mockClear();
    global.innerWidth = 1024; // Default to desktop
  });

  it('renders with initial value', () => {
    renderComponent();
    const textarea = screen.getByTestId('editor-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('// initial code');
  });

  it('calls setValue when code is changed', () => {
    renderComponent();
    const textarea = screen.getByTestId('editor-textarea');
    fireEvent.change(textarea, { target: { value: 'new code' } });
    expect(mockSetValue).toHaveBeenCalledWith('new code');
  });

  it('applies the correct language prop', () => {
    renderComponent({ selectedLanguage: 'python' });
    const editor = screen.getByTestId('mock-editor');
    expect(editor.getAttribute('data-language')).toBe('python');
  });

  it('adjusts for mobile view', () => {
    global.innerWidth = 500; // Mobile width
    renderComponent();
    const options = screen.getByTestId('editor-options').textContent;
    expect(options).toContain('minimap-disabled');
    expect(options).toContain('font-size-14');
  });

  it('uses desktop settings for larger screens', () => {
    global.innerWidth = 1024; // Desktop width
    const { container } = renderComponent();
    const options = screen.getByTestId('editor-options').textContent;
    expect(options).toContain('minimap-enabled');
    expect(options).toContain('font-size-16');
    expect(container.firstChild).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = renderComponent();
    const removeListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    unmount();
    
    expect(removeListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeListenerSpy.mockRestore();
  });
});
