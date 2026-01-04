import { useEffect, useState, useRef } from "react"
import { CustomRadioButton } from "../../../components/CustomRadioButton";
import { formatTime } from "../../../utils/helpers";
import utsavLogo from './../../../assets/logo/uscsLogo.jpeg'
import CustomAlert from "../../../components/CustomAlert";

const InGame = ({ 
  teamName, questions, answers, setAnswers, timers, setTimers, questionIndex, 
  setQuestionIndex, setGameMode,
  totalTimer, setTotalTimer,
  attempts, setAttempts,
  showAlert, setShowAlert
}) => {

  useEffect(()=>{
    initializeGame()
  }, [])

  //*When any 1 option out of the 4 given is clicked
  const handleOptionChange = (pickIndex) => {
    if(showAlert)
      return;
    //First time click -> mark this question as "attempted"
    if(!attempts[questionIndex]){
      setAttempts(oldAttempts=>{
        let newAttempts = [...oldAttempts]
        newAttempts[questionIndex] = true;
        return newAttempts;
      })
    }

    if(answers.length < questionIndex.length)
      initializeGame()
  
    setAnswers(prevAnswers=>{
      const newAnswers = [...prevAnswers]
      newAnswers[questionIndex] = pickIndex
      return newAnswers
    })
    setTotalTimer(prevTime => prevTime - 1);
  };

  const nextQuestion = ()=>{
    if(questionIndex == questions.length - 1){
      setShowAlert(true)
    }else{
      setQuestionIndex(newIndex=> newIndex+1)
      setTotalTimer(prevTime => prevTime - 1);
    }
  }

  const prevQuestion = () =>{
    if(questionIndex >= 1)
      setQuestionIndex(newIndex=> newIndex-1)
      setTotalTimer(prevTime => prevTime - 1);
  }

  //on question number click in right side questions' list
  const jumpQuestion = (index) =>{
    if(index != questionIndex){
      setQuestionIndex(index)
      setTotalTimer(prevTime => prevTime - 1);
    }
  }

  //Alert Handler
  function alert_dontSubmit(){
    setShowAlert(false)
  }

  function alert_doSubmit(){
    setGameMode(3)
    setShowAlert(false)
  }

  function initializeGame(){
    //*When Initial array states are empty -> game has just begun
    if(answers.length < questions.length){
      const newAnswers = Array.from({ length: 20 }).fill(null);
      setAnswers(newAnswers)
    }

    if(timers.length < questions.length){
      const newTimers = Array.from({ length: 20 }).fill(0);
      setTimers(newTimers)
    }

    if(attempts.length < questions.length){
      const defaultAttempts = Array.from({ length: 20 }).fill(false);
      setAttempts(defaultAttempts)
    }
  } 

  const currentQuestion = questions[questionIndex]
  const totalQuestions = questions.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalTimer(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const alertComponent = <CustomAlert message="Are you sure you want to proceed?" onYes={alert_doSubmit} onNo={alert_dontSubmit} id='alert-dialog'/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4 md:p-6">
      {showAlert && alertComponent}
      
      <div className="flex flex-col lg:flex-row gap-6 h-full max-w-7xl mx-auto">
        {/* Left Panel - Question Container */}
        <div className="w-full lg:w-3/5 bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full p-2 shadow-md"
                src="main_logo.gif"
                alt="Logo"
              />
              <div className="ml-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Team {teamName}</h2>
                <p className="text-sm text-gray-600">Round 1 - Quiz Competition</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-lg font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                {questionIndex+1}/{totalQuestions}
              </div>
              <div className="ml-4 bg-red-600 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-md">
                {formatTime(totalTimer)}
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Question:</h3>
            <div className="text-md text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap font-sans">
                {currentQuestion?.['question'] || "Loading question..."}
              </pre>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Options:</h3>
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border transition-all text-black cursor-pointer ${answers[questionIndex] === index 
                  ? 'bg-blue-100 border-blue-500 shadow-md' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                onClick={() => handleOptionChange(index)}
              >
                <CustomRadioButton 
                  id={`option${index+1}`}
                  label={currentQuestion?.['options']?.[index] || "Loading option..."}
                  checked={answers[questionIndex] === index}
                  onChange={() => handleOptionChange(index)}
                  attempted={attempts[questionIndex]}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button 
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${questionIndex === 0 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
              onClick={prevQuestion}
              disabled={questionIndex === 0}
            >
              ← Previous
            </button>
            
            <button 
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-md transition-all"
              onClick={nextQuestion}
            >
              {questionIndex === totalQuestions-1 ? 'Submit Answers' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Right Panel - Questions List */}
        <div className="w-full lg:w-2/5 bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Questions List</h2>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Attempted</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Unattempted</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center cursor-pointer transition-all transform hover:scale-105 shadow-sm ${
                  index === questionIndex 
                    ? 'ring-2 ring-blue-500 ring-opacity-70 bg-blue-100' 
                    : attempt 
                      ? 'bg-green-300 text-green-900' 
                      : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => jumpQuestion(index)}
              >
                <div className="text-sm font-semibold">Q{index+1}</div>
                {answers[index] !== null && (
                  <div className="text-xs mt-1">
                    {String.fromCharCode(65 + answers[index])}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Progress Summary</h3>
            <div className="flex justify-between text-sm text-blue-800 ">
              <span>Attempted: {attempts.filter(a => a).length}/{totalQuestions}</span>
              <span>Remaining: {attempts.filter(a => !a).length}/{totalQuestions}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{ width: `${(attempts.filter(a => a).length / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InGame;