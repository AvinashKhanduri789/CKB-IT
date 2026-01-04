# Testing Documentation

## Test Setup

This project uses the following testing tools:
- **Vitest**: Test runner
- **React Testing Library**: For testing React components
- **MSW (Mock Service Worker)**: For API mocking

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

### 1. Component Tests (`src/components/__tests__/`)
- **CodeEditor.test.jsx**: Tests for the code editor component
  - Renders with initial value
  - Handles code changes
  - Applies language and height props
  - Handles undefined values

### 2. Page Tests (`src/pages/__tests__/`)
- **Round2.test.jsx**: Tests for the Round 2 page
  - Renders and loads questions
  - Handles question selection
  - Submits answers
  - Handles API errors
  - Manages authentication state

## Test Coverage

To generate a coverage report:

```bash
npm run test:coverage
```

This will create a `coverage` directory with detailed reports.

## Best Practices

1. **Test Naming**: Use descriptive test names that explain what's being tested
2. **Arrange-Act-Assert**: Follow the AAA pattern in tests
3. **Mock External Dependencies**: Always mock API calls and browser APIs
4. **Clean Up**: Reset mocks and clean up after each test
5. **Accessibility**: Test for accessibility where applicable

## Common Issues

1. **Async Tests**: Use `async/await` and `waitFor` for async operations
2. **Mocking Hooks**: Use `vi.mock()` to mock React hooks and context
3. **Memory Leaks**: Ensure all mocks are cleared between tests

## Debugging Tests

To debug tests:

1. Use `console.log()` for debugging
2. Use `screen.debug()` to see the rendered component
3. Add `--no-watch` flag to run tests once without watch mode

## Continuous Integration

Tests are automatically run on pull requests and pushes to the main branch using GitHub Actions.

## Version

Last Updated: September 23, 2025
