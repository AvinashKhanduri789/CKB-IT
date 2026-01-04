import React from 'react';

function CustomAlert({ message, onYes, onNo }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-black"> {message} </p>
        <p className="mb-4 text-red-400">  Your Answer Will be Submitted, and no further changes can be done</p>
        <div className="flex justify-end">
          <button className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onYes}>Yes</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
