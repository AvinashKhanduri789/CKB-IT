import codexLogo from "../assets/logo/codexLogo_nobg.png";
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
      className="ml-40 mt-3 animate__animated animate__slideInLeft"
    >
      <div className="flex items-center justify-start">
        <img id="codex-logo" src={codexLogo} style={{width:"100px",height:"100px" , marginTop:"50px"}} />
        <div className="text-5xl mt-12">BYTE 2.0 Rules!</div>
      </div>
      <br />
      <div className="text-3xl"> Final Round - 60 minutes </div>
      <ul className="text-xl w-3/4 ml-5 mt-10">
        <li>
          This is a second/final round consisting of 3 questions under 60
          minutes.
        </li>
        <li>Given a program, assess it and write your code and submit it</li>
        <pre> -  10 points for task completion</pre>
        <pre> -  10 points for code efficiency</pre>
        <pre> -  10 points for algorithm approach</pre>

      </ul>
      <br /> <br />
      <hr className="w-3/4" />
      <br /> <br />
      <div className="text-3xl"> Contest Rules </div>
      <ul className="text-xl w-3/4 ml-5 mt-10">
        <li>Each team can have a maximum of two members.</li>
        <li>
          Only  DSA ,C, C++, JavaScript, Java and Python programming languages are allowed.
        </li>
        <li>Total marks per question: 30 points × 3 questions = 90 points.</li>
        <li>The round’s results are not subject to discussion.</li>
        <li>The decision of the judges is final.</li>
        <li className="text-rose-500
        ">DO NOT REFRESH THE PAGE !!!</li>
        <br />
      </ul>
      <br />
      <div className="w-[100%]">
      <div className="flex items-center justify-between">
        <div
          className="py-4  px-8 rounded-lg bg-yellow-400 text-lg font-semibold  text-black cursor-pointer transition-all duration-200 hover:bg-yellow-500"
          style={{
            fontSize: "25px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
          onClick={goback}
        >
          Go Back
        </div>

        <div
          className="ml-4 py-4 px-8 rounded-lg bg-green-500 text-lg font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-green-600 mr-[25%]"
          style={{
            fontSize: "25px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
          onClick={startGame}
        >
          Round 2
        </div>
        </div>

        {/* <button className="ml-10 py-3 px-4 rounded-lg bg-red-400 text-xl text-white"> 
                    <a href='https://docs.google.com/document/d/1MpQOci0CW1sT0Vw-6-Ljc3ZJcUqk1-cFv-rkCL6YOEE/edit?usp=sharing' target="_blank" rel="noopener noreferrer"> Round 2 </a>
                </button> */}
      </div>
      <div className="mt-20"></div>
    </div>
  );
};

export default GameRules;
