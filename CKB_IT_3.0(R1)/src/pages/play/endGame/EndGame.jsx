import { useEffect } from "react";
import { addTeam } from "../../../utils/requester";

const EndGame = ({
  teamName,
  questions,
  answers,
  timers,
  totalTimer,
  attempts,
}) => {
  function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      //if answer matches + it is attempted
      if (answers[i] == questions[i]["answer"] && attempts[i]) score += 1;
    }
    return score;
  }

  function calculateTimer() {
    if (totalTimer <= 0) return 1800;
    return 1800 - totalTimer;
  }

  const teamStats = {
    name: teamName,
    totalScore: calculateScore(),
    answers: answers,
    answerTime: timers,
    totalTimeTaken: calculateTimer(),
    attempted: attempts,
  };

  //*Save Team Data
  useEffect(() => {
    addTeam(teamStats);
  }, []);

  return (
    <div className="mt-40 ml-40">
      <h1 className="text-8xl text-yellow-500"> Thank You! </h1>
      <br /> <br />
      <h1 className="text-6xl">
        {" "}
        For Taking Part in
        <span className="text-purple-400"> Code Ke Boss </span>
      </h1>
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
      
      <div className="flex ">
      <h2 className="text-3xl"> Your Answers Have been Submitted! </h2>
      <button
        className="w-60 h-14 ml-10 front-page-font-open-sans font-medium rounded-2xl text-center text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-80"
        onClick={() =>
          window.open(
            "https://events.uudoon.in/Account/EventRegistration?evid=90oKJXPuPRLGADHYjdX8hA==",
            "_blank"
          )
        }
      >
        NEXT ROUND -&gt;
      </button>
      </div>
    </div>
  );
};

export default EndGame;
