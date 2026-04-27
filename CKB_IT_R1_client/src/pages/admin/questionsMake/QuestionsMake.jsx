import { useEffect, useState } from "react";
import { updateQuestions } from "../../../utils/requester";

const QuestionsMake = ({ setPageMode, questions, setQuestions, questionIndex, setQuestionIndex }) => {
  const [questionTemp, setQuestionTemp] = useState(undefined);
  const [optionsTemp, setOptionsTemp] = useState(undefined);
  const [answerTemp, setAnswerTemp] = useState(undefined);
  const [isSaving, setIsSaving] = useState(false);

  function returnToPanel() {
    setPageMode(1);
  }

  //* buttons
  async function saveChanges() {
    setIsSaving(true);
    const updatedQuestion = {
      question: questionTemp,
      options: [...optionsTemp],
      answer: answerTemp,
    };
    
    setQuestions((oldQuestions) => {
      let newQuestions = [...oldQuestions];
      newQuestions[questionIndex]["question"] = updatedQuestion["question"];
      newQuestions[questionIndex]["options"] = updatedQuestion["options"];
      newQuestions[questionIndex]["answer"] = updatedQuestion["answer"];
      
      const questionsArr = {
        questions: newQuestions,
      };
      updateQuestions(questionsArr);
      
      return newQuestions;
    });
    
    setTimeout(() => setIsSaving(false), 500);
  }

  function previousQuestion() {
    if (questionIndex >= 1) setQuestionIndex(questionIndex - 1);
  }

  function nextQuestion() {
    if (questionIndex < totalQuestions - 1) setQuestionIndex(questionIndex + 1);
  }

  //*forms value change
  function questionChanger(event) {
    let val = event.target.value;
    setQuestionTemp(val);
  }

  function answerChanger(index) {
    setAnswerTemp(index);
  }

  function optionChanger(event, index) {
    let val = event.target.value;
    setOptionsTemp((oldOptionsTemp) => {
      let newOptionsTemp = [...oldOptionsTemp];
      newOptionsTemp[index] = val;
      return newOptionsTemp;
    });
  }

  const oldQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  //initialize default values for tmpQuestion
  useEffect(() => {
    if (questionTemp == undefined) {
      setQuestionTemp(oldQuestion["question"]);
    }
    if (optionsTemp == undefined) {
      let oldOptions = oldQuestion["options"];
      setOptionsTemp(oldOptions);
    }
    if (answerTemp == undefined) {
      let oldAnswer = oldQuestion["answer"];
      setAnswerTemp(oldAnswer);
    }
  }, [questionIndex]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={returnToPanel}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md px-3 py-2"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back to Panel</span>
        </button>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Edit Question</h2>
              <span className="text-sm font-medium text-gray-500">
                {questionIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Question Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <textarea
                defaultValue={oldQuestion["question"]}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 resize-y"
                rows="3"
                onChange={questionChanger}
                placeholder="Enter question here..."
              />
            </div>

            {/* Options Fields */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Options
              </label>
              <div className="space-y-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                    defaultValue={oldQuestion["options"][index]}
                    onChange={(event) => optionChanger(event, index)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                ))}
              </div>
            </div>

            {/* Answer Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Correct Answer
              </label>
              <div className="flex flex-wrap gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={answerTemp == index}
                      onChange={() => answerChanger(index)}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-400"
                    />
                    <span className="text-sm text-gray-700">
                      Option {String.fromCharCode(65 + index)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className={`px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                  isSaving ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={previousQuestion}
                disabled={questionIndex === 0}
                className={`px-6 py-2 border border-gray-300 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  questionIndex === 0
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                ← Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={questionIndex === totalQuestions - 1}
                className={`px-6 py-2 border border-gray-300 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  questionIndex === totalQuestions - 1
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsMake;