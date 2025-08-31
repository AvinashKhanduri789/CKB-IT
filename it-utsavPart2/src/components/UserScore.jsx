import React from 'react';

const ScoreCard = ({ teamName, score, timeTaken }) => {
  return (
    
      <div className="bg-white p-4 rounded-lg shadow-lg w-[50vw] h-[80px] flex items-center justify-between" style={{margin:"20px",padding:"1rem"}}>
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">Team:</p>
          <p className="font-semibold text-gray-900">{teamName}</p>
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">Score:</p>
          <p className="font-semibold text-gray-900">{score}</p>
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">Time Taken:</p>
          <p className="font-semibold text-gray-900">{timeTaken}</p>
        </div>
      </div>
    
  );
};

export default ScoreCard;
