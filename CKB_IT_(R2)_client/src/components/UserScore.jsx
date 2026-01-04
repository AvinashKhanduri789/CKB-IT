import React, { useState } from 'react';

const ScoreCard = ({ teamName, score, timeTaken, codeAnswers, timeStamps, testCaseResults }) => {
  const [activeTab, setActiveTab] = useState('question1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  
  // Default code answers if none provided
  const defaultAnswers = {
    question1: 'No code submitted for question 1',
    question2: 'No code submitted for question 2',
    question3: 'No code submitted for question 3'
  };
  
  const answers = codeAnswers || defaultAnswers;

  // Function to format text with proper newlines
  const formatText = (text) => {
    if (!text) return '';
    return text.replace(/\\n/g, '\n').replace(/\n/g, '↵\n');
  };

  // Function to calculate time ago
  const getTimeAgo = () => {
    if (!timeStamps) return "Just now";
    
    // Get the latest timestamp
    const timestamps = [
      timeStamps.question1 ? new Date(timeStamps.question1).getTime() : 0,
      timeStamps.question2 ? new Date(timeStamps.question2).getTime() : 0,
      timeStamps.question3 ? new Date(timeStamps.question3).getTime() : 0
    ];
    
    const latestTimestamp = Math.max(...timestamps);
    if (latestTimestamp === 0) return "Just now";
    
    const now = Date.now();
    const differenceInMilliseconds = now - latestTimestamp;
    
    // Convert to appropriate time units
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  };

  // Open modal with the selected question's code
  const openModal = (questionKey, questionTitle) => {
    setModalContent(answers[questionKey]);
    setModalTitle(questionTitle);
    setIsModalOpen(true);
  };

  // Get test case results for active question
  const getTestCaseResults = () => {
    if (!testCaseResults) return null;
    return testCaseResults[activeTab];
  };

  // Render test case results
  const renderTestCaseResults = () => {
    const results = getTestCaseResults();
    if (!results) return null;

    const { passedCount, totalCases, scoreAwarded, testCaseResults: testCases } = results;

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Test Case Results</h3>
          <div className="flex space-x-4">
            <div className="text-center">
              <span className="text-sm text-gray-600">Score Awarded</span>
              <div className="text-xl font-bold text-green-600">{scoreAwarded}</div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Test Cases</span>
              <div className="text-xl font-bold text-blue-600">
                {passedCount}/{totalCases}
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Pass Rate</span>
              <div className="text-xl font-bold text-purple-600">
                {Math.round((passedCount / totalCases) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="space-y-3">
          {testCases.map((testCase, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${testCase.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${testCase.passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium text-gray-800">Test Case #{testCase.index}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${testCase.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {testCase.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>

              {/* Input, Expected Output, and Actual Output */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {/* Input */}
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Input</label>
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                      {formatText(testCase.input)}
                    </pre>
                  </div>
                </div>

                {/* Expected Output */}
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Expected Output</label>
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                      {formatText(testCase.expectedOutput)}
                    </pre>
                  </div>
                </div>

                {/* Actual Output */}
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Actual Output</label>
                  <div className={`p-2 rounded border ${testCase.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">
                      {formatText(testCase.actualOutput)}
                    </pre>
                    {!testCase.passed && (
                      <div className="mt-1 text-xs text-red-600">
                        <span className="font-medium">Mismatch found</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Execution Time */}
              <div className="mt-2 text-xs text-gray-500">
                Executed at: {new Date(testCase.executedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-800">
              {passedCount === totalCases 
                ? 'All test cases passed! Perfect solution.' 
                : `${passedCount} out of ${totalCases} test cases passed. ${passedCount < totalCases ? 'Review the failed cases above.' : ''}`
              }
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto my-5">
      {/* Header with team info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">{teamName}</h2>
          <p className="text-gray-600">Submitted {getTimeAgo()}</p>
        </div>
        
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-700">Total Score</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-700">Time Taken</p>
            <p className="text-2xl font-bold text-gray-900">{timeTaken}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs for questions */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['question1', 'question2', 'question3'].map((question, index) => {
            const hasResults = testCaseResults && testCaseResults[question];
            const passedCount = hasResults ? testCaseResults[question].passedCount : 0;
            const totalCases = hasResults ? testCaseResults[question].totalCases : 0;
            
            return (
              <button
                key={question}
                className={`mr-8 py-4 px-1 text-sm font-medium relative ${
                  activeTab === question
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(question)}
              >
                QUESTION {index + 1}
                {hasResults && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    passedCount === totalCases ? 'bg-green-100 text-green-800' :
                    passedCount > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {passedCount}/{totalCases}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Test Case Results */}
      {renderTestCaseResults()}
      
      {/* Button to view code for active question */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {testCaseResults && testCaseResults[activeTab] && (
            <span>
              Question {activeTab.slice(-1)} Score: <span className="font-bold text-green-600">
                {testCaseResults[activeTab].scoreAwarded}
              </span> points
            </span>
          )}
        </div>
        <button 
          onClick={() => openModal(activeTab, `QUESTION ${activeTab.slice(-1)}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Code for Question {activeTab.slice(-1)}
        </button>
      </div>
      
      {/* Modal with Code View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{modalTitle} - {teamName}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto">
              <div className="p-4">
                <div className="text-sm mb-4 text-gray-400">
                  Submitted code for evaluation:
                </div>
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto">
                  {formatText(modalContent)}
                </pre>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;