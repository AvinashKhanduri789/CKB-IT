import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
// import itUtsavLogo from "../assets/logo/IT-utsav.png";
import DropDown from "../components/Dropdown";
import CodeEditor from "../components/CodeEditor";
import { dummy_questions } from "../utils/constant";
import { submitAnswer, updateQuestionStatus } from "../utils/requester";
import { getQuestions } from "../utils/requester";
import { useNavigate } from "react-router-dom";

const Round2 = () => {
  const [teamName, setTeamName] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const { open, close, opened } = useDisclosure(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitedQuestions, setSubmitedQuestions] = useState([]);
  const [submissionTimes, setSubmissionTimes] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigator = useNavigate();

  // Use localStorage to persist state
  useEffect(() => {
    // Load stored team name and question data
    const storedTeamName = localStorage.getItem("team_name");
    const storedQuestionIndex = localStorage.getItem("questionIndex");
    const storedSubmitedQuestions =
      JSON.parse(localStorage.getItem("submitedQuestions")) || [];
    const storedSubmissionTimes = 
      JSON.parse(localStorage.getItem("submissionTimes")) || {};

    setTeamName(storedTeamName);
    setQuestionIndex(storedQuestionIndex ? parseInt(storedQuestionIndex) : 0);
    setSubmitedQuestions(storedSubmitedQuestions);
    setSubmissionTimes(storedSubmissionTimes);

    // Load questions from an API or other source
    getQuestions().then((resp) => {
      setQuestions(resp.data);
    });

    const handleBeforeUnload = (event) => {
      // Warn user before page unload or refresh
      event.preventDefault();
      event.returnValue = ""; // Some browsers require this for the prompt to show
    };

    // Add event listener to detect page unload or refresh
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Save question index and submission state to localStorage whenever they change
  useEffect(() => {
    if (teamName) {
      localStorage.setItem("team_name", teamName);
    }
    localStorage.setItem("questionIndex", questionIndex);
    localStorage.setItem(
      "submitedQuestions",
      JSON.stringify(submitedQuestions)
    );
    localStorage.setItem(
      "submissionTimes",
      JSON.stringify(submissionTimes)
    );
  }, [teamName, questionIndex, submitedQuestions, submissionTimes]);

  const onNext = () => {
    if (questionIndex < 2) {
      setQuestionIndex(questionIndex + 1);
      setCode("");
    }
  };

  const handleSubmit = () => {
    if (submitedQuestions.includes(questionIndex)) {
      alert(
        "You have already submitted your answer for this question. You cannot modify it."
      );
      return; // Prevent submitting again
    }

    // Show a confirmation message before submitting
    const confirmSubmit = window.confirm(
      "Once you submit your answer, you cannot modify it. Are you sure you want to submit?"
    );
    
    if (confirmSubmit) {
      setIsSubmitting(true);
      console.log("handle submit called");
      console.log(code);

      // Record submission time
      const submissionTime = new Date().toISOString();
      setSubmissionTimes(prev => ({
        ...prev,
        [questionIndex]: submissionTime
      }));

      // Immediately add the current question to submitted questions
      const updatedSubmittedQuestions = [...submitedQuestions, questionIndex];
      setSubmitedQuestions(updatedSubmittedQuestions);

      submitAnswer(teamName, code, currentLanguage, questionIndex + 1, submissionTime)
        .then((response) => {
          console.log("Response from submitAnswers:", response);
          
          if (updatedSubmittedQuestions.length === 3) {
            // Clear localStorage after final submission
            localStorage.clear();
            navigator("/thanku");
          } else {
            // Navigate to the next question
            onNext();
          }
        })
        .catch((error) => {
          console.log("Error submitting answer:", error);
          updateQuestionStatus(teamName, questionIndex + 1, submissionTime);
          
          if (updatedSubmittedQuestions.length === 3) {
            // Clear localStorage after final submission
            localStorage.clear();
            navigator("/thanku");
          } else {
            // Navigate to the next question even if there's an error
            onNext();
          }
        })
        .finally(() => {
          setIsSubmitting(false);
          alert("Your answer has been submitted!");
        });
    } else {
      alert("Submission canceled. You can still modify your answer.");
    }
  };

  const onPreviews = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-3 md:p-4">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full w-full max-w-screen-2xl mx-auto">
        {/* Question container - 40% width */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 md:p-5 w-full md:w-[40%] flex flex-col shadow-lg border border-gray-600">
          {/* Top section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-5">
            {/* Codex Logo with better visibility */}
            <div className="flex items-center mb-3 md:mb-0">
              <div className="bg-cyan-800 p-2 rounded-xl border border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] mr-3">
                <img 
                  src="/Codex-logo.png" 
                  alt="Codex Club Logo" 
                  className="h-10 md:h-12 w-auto" 
                />
              </div>
              <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-bold text-cyan-300 font-[Open_Sans]">
                  CODEX
                </div>
                <div className="text-lg md:text-xl text-cyan-500 font-[Open_Sans] font-medium">
                  CLUB
                </div>
              </div>
            </div>
            
            <p className="font-bold text-white text-lg md:text-xl mb-3 md:mb-0 text-center md:text-left bg-blue-800 px-3 py-1 rounded-md">
              Team: {teamName}
            </p>
            
            <p className="text-white text-lg md:text-xl font-semibold bg-purple-700 px-3 py-1 rounded-md">
              {`${questionIndex + 1}/3`}
            </p>
          </div>

          {/* Question index container - Improved design */}
          <div className="flex justify-between items-center rounded-lg bg-gray-700 p-1 mb-4 md:mb-5 border border-gray-500">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`font-bold text-xs md:text-sm rounded-lg px-2 md:px-3 py-1 cursor-pointer transition-all duration-300 flex-1 text-center mx-1 ${
                  submitedQuestions.includes(index)
                    ? "bg-green-600 text-white shadow-md"
                    : questionIndex === index
                    ? "bg-yellow-400 text-black shadow-md"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
                onClick={() => {
                  setQuestionIndex(index);
                  setCode("");
                }}
              >
                Q{index + 1}
              </div>
            ))}
          </div>

          {/* Question content - Improved presentation */}
          <div className="bg-gray-700 rounded-lg p-4 flex-1 overflow-y-auto border border-gray-600">
            <div className="text-white">
              <div className="flex items-start mb-3">
                <span className="font-bold text-xl md:text-2xl text-blue-300 mr-2">Q:</span>
                <span className="text-base md:text-lg font-medium">
                  {questions[questionIndex]?.text || "Loading question..."}
                </span>
              </div>
              
              {/* Add example input/output if available */}
              {questions[questionIndex]?.example && (
                <div className="mt-4 p-3 bg-gray-800 rounded-md border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-300 mb-1 text-sm">Example:</h3>
                  <pre className="text-xs text-gray-200 whitespace-pre-wrap">
                    {questions[questionIndex].example}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4 md:mt-5">
            <button
              className="px-3 md:px-4 py-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center text-sm"
              onClick={onPreviews}
              disabled={questionIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button
              className="px-3 md:px-4 py-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center text-sm"
              onClick={onNext}
              disabled={questionIndex === 2}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Code editor container - 60% width */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 md:p-5 w-full md:w-[60%] flex flex-col shadow-lg border border-gray-600">
          <div className="h-full w-full bg-gray-900 rounded-lg p-3 flex flex-col border border-gray-700">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-3">
              <DropDown
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
              />

              {/* Conditionally hide the submit button only if the question is already submitted */}
              {!submitedQuestions.includes(questionIndex) && (
                <button
                  className={`relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 
                    rounded-xl text-sm md:text-base font-semibold mt-3 md:mt-0 px-4 md:px-6 py-2 md:py-2.5 shadow-lg 
                    transition-all duration-300 transform hover:scale-105 flex items-center group
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {/* Animated background effect */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                  
                  {/* Icon and text */}
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 极 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:animate-bounce" fill="none" viewBox="极 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Submit Answer</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Code editor */}
            <div className="flex-1 min-h-[300px] md:min-h-0 rounded-md overflow-hidden border border-gray-600">
              <CodeEditor
                value={code}
                setValue={setCode}
                selectedLanguage={currentLanguage}
              />
            </div>
            
            {/* Status indicator */}
            <div className="mt-3 flex justify-center">
              <div className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center ${
                submitedQuestions.includes(questionIndex) 
                  ? "bg-green-700 text-white" 
                  : "bg-blue-700 text-white"
              }`}>
                {submitedQuestions.includes(questionIndex) ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13极4 4L19 7" />
                    </svg>
                    Answer Submitted
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/s极" className="h-4 w-4 mr-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Answer Pending
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <p>This is a modal</p>
      </Modal>
    </div>
  );
};

export default Round2;