import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTeam } from "../utils/requester";

function FrontPage() {
  const [inputValue, setInputValue] = useState("");
  const navigator = useNavigate();
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const startGame = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setLoading(true);
    setError(false);
    postTeam(inputValue)
      .then(() => {
        window.localStorage.setItem("team_name", inputValue);
        setLoading(false);
        navigator("/gameRules");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.error("Error posting team:", err);
        alert(err.response.data.message);
      });
  };

  const switchAdminMode = () => {
    navigator("/login");
  };

  return (
    <>
      <div className="bg-[url(./bg.png)] bg-cover bg-center w-full h-screen overflow-x-hidden">
        <div className="w-full h-full bg-[rgba(0,0,0,0.3)] pt-5">
          {/* Nav */}
          <div className="w-full flex flex-col sm:flex-row sm:justify-around sm:items-center absolute top-5 px-6 sm:px-18 gap-4 sm:gap-0">
            {/* logo */}
            <div className="hidden sm:flex bg-white py-2 w-52 sm:w-80 justify-center rounded-full shadow-[0_0_20px_rgba(34,211,238,0.7)] mx-auto sm:mx-0">
              <img className="h-10" src="./UUlogo.png" alt="Uttaranchal University logo" />
            </div>

            {/* Heading */}
            <div className="hidden sm:block text-center sm:text-left uppercase font-[Orbitron] text-xl sm:text-3xl text-white font-bold tracking-wide [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
              Uttaranchal School Of Computing Sciences
            </div>
          </div>

          {/* Container main */}
          <div className="w-full h-[80%] mt-28 sm:mt-32 flex justify-center items-center">
            <div className="h-[90%] w-[90%] sm:w-[85%] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl shadow-[0_0_10px_rgba(34,211,238,0.3)] flex flex-col lg:flex-row">
              {/* Left content */}
              <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full">
                  {/* logo */}
                  <div className="w-24 h-24 sm:w-30 sm:h-full bg-[rgba(0,0,0,0.2)] p-4 rounded-2xl border border-cyan-500 shadow-[0_0_5px_rgba(34,211,238,0.7)] animate-pulse">
                    <img src="/Codex-logo.png" alt="codex club logo" />
                  </div>

                  <div className="flex flex-col text-center sm:text-left">
                    <div className="text-4xl sm:text-6xl text-cyan-200 font-[Open_Sans] font-bold">
                      CODEX
                    </div>
                    <div className="text-2xl sm:text-4xl text-cyan-600 font-[Open_Sans] font-medium">
                      CLUB
                    </div>
                  </div>
                </div>

                <div className="w-full my-4 text-center sm:text-left">
                  <h1 className="font-[Orbitron] text-5xl sm:text-[100px] font-bold text-cyan-300 [text-shadow:0_0_10px_rgba(34,211,238,0.7)]">
                    BYTE 2.O
                  </h1>
                  <p className="font-[Montserrat] font-semibold text-lg sm:text-2xl text-cyan-200">
                    BOOST YOUR TECHNICAL EXCELLENCE
                  </p>
                </div>

                <div className="w-full text-center sm:text-left">
                  <p className="uppercase my-6 sm:my-8 font-[Montserrat] font-medium text-xl sm:text-3xl text-amber-200 [text-shadow:0_0_10px_rgba(251,191,36,0.7)]">
                    A premier Coding Contest
                  </p>
                </div>
              </div>

              {/* Right form */}
              <div className="flex flex-1 m-5 justify-center items-center flex-col">
                <form
                  onSubmit={startGame}
                  className="w-[95%] sm:w-[80%] py-6 sm:py-8 bg-[rgba(0,0,0,0.2)] rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] border-2 border-cyan-500 flex flex-col justify-evenly items-center gap-6 sm:gap-8"
                >
                  <input
                    type="text"
                    placeholder="Enter Team Number : "
                    value={inputValue}
                    onChange={handleChange}
                    required
                    className="w-[90%] sm:w-[80%] border-2 font-[Open_Sans] font-medium border-cyan-500 h-12 sm:h-15 rounded-2xl text-center text-lg sm:text-2xl text-white bg-transparent"
                  />
                  <button
                    type="submit"
                    className="w-[90%] sm:w-[80%] h-12 sm:h-15 font-[Open_Sans] font-medium rounded-2xl text-center text-lg sm:text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-80"
                  >
                    {
                      loading ? "Loading...": "Start"
                    }
                  </button>
                </form>

                <button
                  onClick={switchAdminMode}
                  className="mt-6 sm:mt-0 py-2 px-8 sm:px-10 font-[Open_Sans] font-medium text-lg sm:text-xl text-white bg-[#ff00006b] [text-shadow:0_0_10px_rgba(255,255,255,0.6)] border-2 border-[rgba(255,255,255,0.5)] hover:bg-[rgb(143,6,6)] rounded-full sm:absolute sm:bottom-4 sm:right-4"
                >
                  <i className="fa-solid fa-circle-user pr-4 sm:pr-10"></i>
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
