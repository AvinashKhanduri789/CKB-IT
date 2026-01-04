import codexLogo from "./../../../assets/logo/codexLogo_nobg.png";

const GameRules = ({ setGameMode }) => {
  function goback() {
    setGameMode(0);
  }

  function startGame() {
    setGameMode(2);
  }

  return (
    <div
      id="gameRules-container"
      className="animate__animated animate__slideInLeft px-4 md:ml-40 mt-3"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <img id="codex-logo" src={codexLogo} className="w-20 md:w-28" alt="Codex Logo" />
        <div className="text-2xl sm:text-3xl md:text-5xl font-bold">
          BYTE 2.0 Rules!
        </div>
      </div>

      {/* Preliminary round */}
      <div className="mt-6 text-xl md:text-3xl font-semibold">
        Preliminary Round - 30 minutes
      </div>
      <ul className="text-base sm:text-lg md:text-xl w-full md:w-3/4 ml-2 md:ml-5 mt-6 space-y-3">
        <li>
          This is the first round, a pseudo code–based quiz where participants
          will be tested on their foundational knowledge of DSA, C, C++, and
          Python.
        </li>
        <li>
          The quiz will consist of 20 multiple-choice questions to be answered
          within 30 minutes.
        </li>
        <li>Each question carries one mark.</li>
        <li>
          Winners will be announced based on the total marks earned. In case of
          a tie, the submission time will be considered.
        </li>
      </ul>

      {/* Divider */}
      <div className="my-10">
        <hr className="w-full md:w-3/4" />
      </div>

      {/* Contest rules */}
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Contest Rules
      </div>
      <ul className="text-base sm:text-lg md:text-xl w-full md:w-3/4 ml-2 md:ml-5 mt-6 space-y-3">
        <li>Each team can have a maximum of two members.</li>
        <li>The round’s results are not subject to discussion.</li>
        <li>The decision of the judges is final.</li>
        <li className="text-rose-600 font-bold">DO NOT REFRESH THE PAGE !!!</li>
      </ul>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center md:justify-between mt-10 gap-4 md:gap-0">
        <button
          className="py-3 px-6 rounded-lg bg-yellow-400 text-lg md:text-xl text-black w-full sm:w-auto"
          onClick={goback}
        >
          Go Back
        </button>
        <button
          className="py-3 px-6 rounded-lg bg-green-500 text-lg md:text-xl text-white w-full sm:w-auto md:mr-[30%]"
          onClick={startGame}
        >
          Round 1
        </button>
      </div>

      <div className="mt-20"></div>
    </div>
  );
};

export default GameRules;
