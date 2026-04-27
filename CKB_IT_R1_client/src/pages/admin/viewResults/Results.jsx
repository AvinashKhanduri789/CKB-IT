import { useEffect, useState } from "react";
import { sortArrayOfObjects } from "../../../utils/helpers";

const ResultsFull = ({ teams, onClickHandler }) => {
  function countAttempts(attemptsData) {
    let attempts = 0;
    attemptsData.forEach((attempt) => {
      if (attempt) attempts++;
    });
    return attempts;
  }

  function formatTimer(seconds) {
    let mins = Math.floor(seconds / 60);
    let remSecs = seconds - 60 * mins;
    return `${mins} min ${remSecs} sec`;
  }

  return (
    <div className="space-y-3">
      {teams.map((team, index) => (
        <div
          className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          key={index}
          onClick={() => onClickHandler(index)}
        >
          <div className="flex flex-wrap items-center justify-between mb-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Team Name</span>
              <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-500">Time Taken</span>
              <p className="text-md font-mono text-gray-700">{formatTimer(team.totalTimeTaken)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-3 border-t border-gray-100">
            <div>
              <span className="text-sm font-medium text-gray-500">Total Score</span>
              <p className="text-xl font-bold text-gray-900">
                {team.totalScore}/{team.answers.length}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Attempted</span>
              <p className="text-xl font-bold text-gray-700">{countAttempts(team["attempted"])}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ResultsDepth = ({ teamData, questions }) => {
  function generateOptions(option, question, questionIndex, optionIndex) {
    // question not attempted -> options have no color
    if (!teamData["attempted"][questionIndex]) {
      return (
        <div key={optionIndex} className="flex items-start gap-3 py-1">
          <span className="text-sm font-medium text-gray-500 w-6">
            {String.fromCharCode(65 + optionIndex)}.
          </span>
          <span className="text-gray-700">{option}</span>
        </div>
      );
    } else {
      // current option is the one user picked
      if (optionIndex == teamData["answers"][questionIndex]) {
        if (teamData["answers"][questionIndex] == question["answer"]) {
          // correct pick
          return (
            <div key={questionIndex} className="flex items-start gap-3 py-1">
              <span className="text-sm font-medium text-gray-500 w-6">
                {String.fromCharCode(65 + optionIndex)}.
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md">
                {option}
              </span>
            </div>
          );
        } else {
          // wrong pick
          return (
            <div key={questionIndex} className="flex items-start gap-3 py-1">
              <span className="text-sm font-medium text-gray-500 w-6">
                {String.fromCharCode(65 + optionIndex)}.
              </span>
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-md">
                {option}
              </span>
            </div>
          );
        }
      }
      // other options
      else {
        return (
          <div key={optionIndex} className="flex items-start gap-3 py-1">
            <span className="text-sm font-medium text-gray-500 w-6">
              {String.fromCharCode(65 + optionIndex)}.
            </span>
            <span className="text-gray-700">{option}</span>
          </div>
        );
      }
    }
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div className="bg-white border border-gray-200 rounded-lg p-5" key={index}>
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <span className="text-sm font-medium text-gray-500 w-8">Q{index + 1}.</span>
              <pre className="text-gray-900 font-medium whitespace-pre-wrap flex-1">
                {teamData["attempted"][index] ? (
                  question["question"]
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md">
                    {question["question"]}
                  </span>
                )}
              </pre>
            </div>
          </div>

          <div className="ml-11 space-y-1">
            {question["options"].map((option, questionIndex) =>
              generateOptions(option, question, index, questionIndex)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Results = ({ setPageMode, teams, setTeams, questions, s }) => {
  const [viewState, setViewState] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const sortedTeams = [...teams].sort((a, b) => {
      // Sort by totalScore in descending order (highest score first)
      if (a.totalScore !== b.totalScore) {
        return b.totalScore - a.totalScore; // Higher score first
      }
      // If scores are the same, sort by totalTimeTaken in ascending order (lower time first)
      return a.totalTimeTaken - b.totalTimeTaken;
    });

    // If sorted array is different from current teams, update state
    if (JSON.stringify(teams) !== JSON.stringify(sortedTeams)) {
      setTeams(sortedTeams);
    }
  }, [teams]);

  function returnToPanel() {
    // if in depth -> go to full overview
    if (viewState == 1) {
      setViewState(0);
    }
    // if in overview -> go back to panel
    else setPageMode(1);
  }

  function resultsClick(index) {
    setSelectedIndex(index);
    setViewState(1);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={returnToPanel}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md px-3 py-2"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">View Results</h1>
          {viewState == 0 ? (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Sorted by Score (highest first) & Time (fastest first)</p>
              <p className="text-xs text-gray-400 mt-1">Click on any team to view detailed answers</p>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Detailed Results for{" "}
                <span className="font-semibold text-gray-900">{teams[selectedIndex]["name"]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Results Content */}
        {viewState == 0 ? (
          <ResultsFull teams={teams} onClickHandler={resultsClick} />
        ) : (
          <ResultsDepth teamData={teams[selectedIndex]} questions={questions} />
        )}
      </div>
    </div>
  );
};

export default Results;