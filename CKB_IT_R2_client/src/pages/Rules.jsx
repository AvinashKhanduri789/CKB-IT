import codexLogo from "../assets/logo/main_logo.gif";
import "../styles/css/rules.css";
import { useNavigate } from "react-router-dom";

const GameRules = ({ setGameMode }) => {
  const navigator = useNavigate();

  function goback() {
    navigator("/");
  }

  function startGame() {
    navigator("/round2");
  }

  return (
    <div
      id="gameRules-container"
      className="animate__animated animate__slideInLeft"
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <img 
          id="codex-logo" 
          src={codexLogo} 
          alt="CodeX Logo"
          className="w-32 h-32"
        />
        <div className="text-5xl font-bold">BYTE 2.0 Rules!</div>
      </div>
      
      {/* Final Round Section */}
      <div className="text-3xl font-semibold mb-4">Final Round - 60 minutes</div>
      <div className="ml-6 mb-10">
        <ul className="text-xl space-y-3">
          <li className="ml-5">
            This is a second/final round consisting of 3 questions under 60 minutes.
          </li>
          <li className="ml-5">
            Given a program, assess it and write your code and submit it
          </li>
          <div className="ml-10 space-y-1">
            <div className="flex items-center">
              <span className="mr-2">•</span>
              <span>10 points for task completion</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">•</span>
              <span>10 points for code efficiency</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">•</span>
              <span>10 points for algorithm approach</span>
            </div>
          </div>
        </ul>
      </div>
      
      <hr className="w-3/4 border-gray-600 my-10" />
      
      {/* Contest Rules Section */}
      <div className="text-3xl font-semibold mb-4">Contest Rules</div>
      <div className="ml-6">
        <ul className="text-xl space-y-3">
          <li className="ml-5">Each team can have a maximum of two members.</li>
          <li className="ml-5">
            Only DSA, C, C++, JavaScript, Java and Python programming languages are allowed.
          </li>
          <li className="ml-5">Total marks per question: 30 points × 3 questions = 90 points.</li>
          <li className="ml-5">The round's results are not subject to discussion.</li>
          <li className="ml-5">The decision of the judges is final.</li>
          <li className="ml-5 text-rose-500 font-semibold">
            DO NOT REFRESH THE PAGE !!!
          </li>
        </ul>
      </div>
      
      {/* Buttons Section */}
      <div style={{marginTop:"2rem",marginBottom:"3rem"}} className=" flex justify-between items-center">
        <button
          onClick={goback}
          className="py-3 px-8 rounded-lg bg-yellow-400 text-black text-xl font-semibold 
                     hover:bg-yellow-500 transition-all duration-200 cursor-pointer
                     min-w-[180px]"
        >
          Go Back
        </button>
        
        <button
          onClick={startGame}
          className="py-3 px-8 rounded-lg bg-green-500 text-white text-xl font-semibold 
                     hover:bg-green-600 transition-all duration-200 cursor-pointer
                     min-w-[180px]"
        >
          Round 2
        </button>
      </div>
      
      <div className="mt-20"></div>
    </div>
  );
};

export default GameRules;