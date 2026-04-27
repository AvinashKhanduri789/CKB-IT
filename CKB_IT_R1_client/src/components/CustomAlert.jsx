import React from 'react';

function CustomAlert({ message, onYes, onNo }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-black">Confirm Submission</h3>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-black text-center mb-3">{message}</p>
          <p className="text-red-600 text-center text-sm font-medium">
            ⚠️ Your answers will be submitted and no further changes can be made
          </p>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button 
            className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-black font-semibold rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onNo}
          >
            No, Go Back
          </button>
          <button 
            className="px-5 py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onYes}
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;