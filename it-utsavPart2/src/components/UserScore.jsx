import React, { useState } from 'react';

const   ScoreCard = ({ teamName, score, timeTaken, codeAnswers }) => {
  const [activeTab, setActiveTab] = useState('question1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  
  // Default code answers if none provided

  
  const answers = codeAnswers || defaultAnswers;

  // Open modal with the selected question's code
  const openModal = (questionKey, questionTitle) => {
    setModalContent(answers[questionKey]);
    setModalTitle(questionTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-5">
      {/* Header with team info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">{teamName}</h2>
          <p className="text-gray-600">Submitted {timeTaken} ago</p>
        </div>
        
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-700">Score</p>
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
          {['question1', 'question2', 'question3'].map((question, index) => (
            <button
              key={question}
              className={`mr-8 py-4 px-1 text-sm font-medium ${
                activeTab === question
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(question)}
            >
              QUESTION {index + 1}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Button to view code for active question */}
      <div className="mt-6 flex justify-center">
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
      
      {/* Modal with Monaco Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
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
            
            <div className="flex-1 min-h-0">
              {/* Monaco Editor will be rendered here */}
              <div className="h-96 bg-gray-900 text-white p-4 overflow-auto">
                <div className="text-sm mb-4 text-gray-400">
                  
                </div>
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-800 p-4 rounded">
                  {modalContent}
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