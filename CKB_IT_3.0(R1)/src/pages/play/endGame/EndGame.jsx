import { useEffect, useState } from "react";
import { addTeam } from "../../../utils/requester";

const EndGame = ({
  teamName,
  questions,
  answers,
  timers,
  totalTimer,
  attempts,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showNextRoundButton, setShowNextRoundButton] = useState(false);

  function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      //if answer matches + it is attempted
      if (answers[i] == questions[i]["answer"] && attempts[i]) score += 1;
    }
    return score;
  }

  function calculateTimer() {
    const totalQuizTime = 30 * 60; // 30 minutes in seconds
    
    if (totalTimer <= 0) {
      return totalQuizTime;
    }
    
    const elapsedTime = totalQuizTime - totalTimer;
    return elapsedTime;
  }

  const teamStats = {
    name: teamName,
    totalScore: calculateScore(),
    answers: answers,
    answerTime: timers,
    totalTimeTaken: calculateTimer(),
    attempted: attempts,
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  //*Save Team Data
  useEffect(() => {
    addTeam(teamStats);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      setShowNextRoundButton(true);
      return;
    }

    const timerId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl text-yellow-500 font-bold mb-8">Thank You!</h1>

        <h1 className="text-4xl md:text-6xl mb-12 text-yellow-500">
          For Taking Part in
          <span className="text-purple-500"> BYTE 2.0 </span>
        </h1>

        <div className="bg-white rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Your Answers Have Been Submitted!</h2>

          <div className="flex flex-col items-center">
            <div className="text-xl mb-4 text-gray-600">Next round will begin in:</div>

            {!showNextRoundButton ? (
              <div className="flex flex-col items-center">
                <div className="text-5xl md:text-6xl font-mono font-bold text-blue-600 mb-4">
                  {formatTime(timeRemaining)}
                </div>
                <div className="w-64 h-6 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(1 - timeRemaining / (30 * 60)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 mt-4">Please wait for the next round to begin</p>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-6">
                {/* extra  */}
                <p className="text-green-600 text-xl mb-6">Next round is now available!</p>
                <button
                  className="w-60 h-14 font-medium rounded-2xl text-center text-xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105"
                  onClick={() =>
                    window.location.href = "https://byte-s2-r2.vercel.app/"
                  }
                   type="button"
                >
                  NEXT ROUND -&gt;
                </button>

              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default EndGame;