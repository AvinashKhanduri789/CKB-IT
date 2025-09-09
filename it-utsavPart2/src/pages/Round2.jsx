import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import itUtsavLogo from "../assets/logo/IT-utsav.png";
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
  const [questions, setQuestions] = useState([]);
  const navigator = useNavigate();

  // Use localStorage to persist state
  useEffect(() => {
    // Load stored team name and question data
    const storedTeamName = localStorage.getItem("team_name");
    const storedQuestionIndex = localStorage.getItem("questionIndex");
    const storedSubmitedQuestions =
      JSON.parse(localStorage.getItem("submitedQuestions")) || [];

    setTeamName(storedTeamName);
    setQuestionIndex(storedQuestionIndex ? parseInt(storedQuestionIndex) : 0);
    setSubmitedQuestions(storedSubmitedQuestions);

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
  }, [teamName, questionIndex, submitedQuestions]);

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
      console.log("handle submit called");
      console.log(code);

      // Immediately add the current question to submitted questions
      setSubmitedQuestions((prevState) => {
        const updatedState = [...prevState, questionIndex]; // Add questionIndex to the submitted questions
        console.log(updatedState); // To check the updated state
        if (updatedState.length === 3) {
          return navigator("/");
        }
        return updatedState;
      });

      submitAnswer(teamName, code, currentLanguage, questionIndex + 1)
        .then((response) => {
          console.log("Response from submitAnswers:", response);

          // No alert for successful submission
        })
        .catch((error) => {
          console.error("Error submitting answer:", error);
          updateQuestionStatus(teamName, questionIndex + 1);
          // No alert for errors
        })
        .finally(() => {
          alert("Your answer has been submitted!");
          // Navigate to the next question regardless of success or error
          onNext(); // Call the function to go to the next question
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
    <>
      <div className="flex justify-evenly items-center h-screen">
        {/* question container */}
        <div className="bg-gray-300 rounded-2xl p-5 h-[80vh] w-[45vw] scrollbar-hidden overflow-y-scroll">
          {/* top section */}
          <div
            className="flex items-center justify-between px-[10%]"
            style={{ marginTop: "10px" }}
          >
            <img src='main_logo.gif' alt="" className="h-[5rem] bg-black rounded-full" />
            
            <p className="font-bold text-black text-2xl">Team : {teamName}</p>
            <p className="text-black text-2xl">{`${questionIndex + 1}/3`}</p>
          </div>

          {/* question index container */}
          <div
            className="flex items-center justify-evenly rounded-full bg-gray-400 w-[35vw] translate-x-10"
            style={{ marginTop: "2rem", padding: "10px" }}
          >
            <div
              className={`font-bold text-black text-[1rem] bg-white rounded-2xl pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] hover:cursor-pointer`}
              style={{
                paddingLeft: "7px",
                paddingRight: "7px",
                paddingTop: "1px",
                paddingBottom: "1px",
                backgroundColor: submitedQuestions.includes(0)
                  ? "#28a745"
                  : questionIndex === 0
                  ? "#ffeb3b"
                  : "", // Green if submitted, yellow if selected
              }}
              onClick={() => {
                setQuestionIndex(0);
                setCode("");
              }}
            >
              Question 1
            </div>

            <div
              className={`font-bold text-black text-[1rem] bg-white rounded-2xl pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] hover:cursor-pointer`}
              style={{
                paddingLeft: "7px",
                paddingRight: "7px",
                paddingTop: "1px",
                paddingBottom: "1px",
                backgroundColor: submitedQuestions.includes(1)
                  ? "#28a745"
                  : questionIndex === 1
                  ? "#ffeb3b"
                  : "", // Green if submitted, yellow if selected
              }}
              onClick={() => {
                setQuestionIndex(1);
                setCode("");
              }}
            >
              Question 2
            </div>

            <div
              className={`font-bold text-black text-[1rem] bg-white rounded-2xl pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] hover:cursor-pointer`}
              style={{
                paddingLeft: "7px",
                paddingRight: "7px",
                paddingTop: "1px",
                paddingBottom: "1px",
                backgroundColor: submitedQuestions.includes(2)
                  ? "#28a745"
                  : questionIndex === 2
                  ? "#ffeb3b"
                  : "", // Green if submitted, yellow if selected
              }}
              onClick={() => {
                setQuestionIndex(2);
                setCode("");
              }}
            >
              Question 3
            </div>
          </div>

          {/* question */}
          <div
            className="text-black text-justify "
            style={{ padding: "2rem", marginTop: "1rem" }}
          >
            <span className="font-bold text-2xl">Q: </span>
            {questions[questionIndex]?.text}
          </div>

          {/* previews and next button container */}
          <div
            className="flex justify-between items-center"
            style={{ padding: "1rem" }}
          >
            <div
              style={{
                padding: "5px 24px",
                border: "2px solid black",
                borderRadius: "8px",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "center",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onClick={onPreviews}
            >
              Previous
            </div>

            <div
              style={{
                padding: "5px 24px",
                border: "2px solid black",
                borderRadius: "8px",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "center",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onClick={onNext}
            >
              Next
            </div>
          </div>
        </div>

        {/* code editor container */}
        <div className="bg-gray-300 rounded-2xl p-5 h-[80vh] w-[47vw] ml-3 flex items-center justify-center">
          <div className="h-[75vh] w-[47vw] bg-gray-500 rounded-2xl">
            {/* top bar */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "1rem" }}
            >
              <DropDown
                currentLanguage={currentLanguage}
                setCurrentLanguage={setCurrentLanguage}
              />

              {/* Conditionally hide the submit button only if the question is already submitted */}
              {!submitedQuestions.includes(questionIndex) && (
                <Button
                  className="bg-red-700 rounded-3xl text-[1.5rem] border-black border-2"
                  style={{
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                  onClick={handleSubmit}
                  variant="default"
                >
                  Submit
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center">
              <CodeEditor
                value={code}
                setValue={setCode}
                selectedLanguage={currentLanguage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <p>This is a modal</p>
      </Modal>
    </>
  );
};

export default Round2;
