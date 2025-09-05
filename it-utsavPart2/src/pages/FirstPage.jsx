import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTeam } from "../utils/requester";

function FrontPage() {
  const [inputValue, setInputValue] = useState("");
  const navigator = useNavigate();

  // Handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submit
  const startGame = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return; // safeguard if empty

    postTeam(inputValue)
      .then(() => {
        window.localStorage.setItem("team_name", inputValue);
        navigator("/gameRules");
      })
      .catch((err) => {
        console.error("Error posting team:", err);
        alert("Failed to start game. Please try again!");
      });
  };

  // Admin button redirect
  const switchAdminMode = () => {
    navigator("/login");
  };

  return (
    <>
      {/* Background image */}
      <div className="bg-[url(./bg.png)] bg-cover bg-center w-screen h-screen">
        {/* added dark filter */}
        <div className="w-[100%] h-[100%] bg-[rgba(0,0,0,0.3)] pt-5 ">
          {/* Nav - logo and USCS */}
          <div className="w-[100%] flex justify-around items-center absolute top-15 px-18">
            {/* logo */}
            <div className="bg-white py-2 w-80 flex justify-center rounded-full shadow-[0_0_20px_rgba(34,211,238,0.7)]">
              <img
                className="h-10 "
                src="./UUlogo.png"
                alt="Uttaranchal University logo"
              />
            </div>

            {/* Heading USCS */}
            <div className="uppercase font-[Orbitron] text-3xl text-white font-bold tracking-wide [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
              Uttaranchal School Of Computing Sciences
            </div>
          </div>

          {/* Container main*/}
          <div className="w-screen h-[80%] mt-25 flex justify-center items-center">
            {/* content container */}
            <div className="h-[90%] w-[85%] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl shadow-[0_0_10px_rgba(34,211,238,0.3)] flex">
              {/* content div*/}
              <div className="flex-1 flex ml-16 flex-col justify-center items-center p-8">
                {/* logo and club shit */}
                <div className="flex h-30 w-[100%]">
                  {/* logo */}
                  <div className="w-30 h-[100%] bg-[rgba(0,0,0,0.2)] p-4 rounded-2xl border border-cyan-500 shadow-[0_0_5px_rgba(34,211,238,0.7)] animate-pulse ease-in-out duration-500">
                    <img src="/Codex-logo.png" alt="codex club logo" />
                  </div>

                  <div className="flex flex-col ml-8 py-3">
                    <div className="flex-2 text-6xl text-cyan-200 font-[Open_Sans] font-bold">
                      CODEX
                    </div>
                    <div className="flex-1 text-4xl text-cyan-600 font-[Open_Sans] font-medium">
                      CLUB
                    </div>
                  </div>
                </div>

                <div className="w-[100%] my-4">
                  <h1 className="font-[Orbitron]  text-[100px] font-bold text-cyan-300 [text-shadow:0_0_10px_rgba(34,211,238,0.7)]">
                    BYTE 2.O
                  </h1>
                  <p className="font-[Montserrat]  font-semibold text-2xl text-cyan-200">
                    BOOST YOUR TECHNICAL EXCELLENCE
                  </p>
                </div>

                <div className="w-[100%]">
                  <p className="uppercase my-8 font-[Montserrat] font-medium text-3xl text-amber-200 [text-shadow:0_0_10px_rgba(251,191,36,0.7)]">
                    A premier Coding Contest
                  </p>
                </div>
              </div>

              {/* form div */}
              <div className="flex flex-1 m-5 justify-center items-center flex-col">
                {/* Main form */}
                <form
                  onSubmit={startGame}
                  className="w-[80%] h-65 py-8 bg-[rgba(0,0,0,0.2)] rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] border-2 border-cyan-500 flex flex-col justify-evenly items-center"
                >
                  <input
                    type="text"
                    placeholder="Enter Team Number : "
                    value={inputValue}
                    onChange={handleChange}
                    required
                    className="w-[80%] border-2 font-[Open_Sans] font-medium border-cyan-500 h-15 rounded-2xl text-center text-2xl text-white bg-transparent"
                  />
                  <button
                    type="submit"
                    className="w-[80%] h-15 font-[Open_Sans] font-medium rounded-2xl text-center text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-80"
                  >
                    START
                  </button>
                </form>

                {/* Admin Button */}
                <button
                  onClick={switchAdminMode}
                  className="py-2 px-10 font-[Open_Sans] font-medium text-xl text-white bg-[#ff00006b] [text-shadow:0_0_10px_rgba(255,255,255,0.6)] border-2 border-[rgba(255,255,255,0.5)] hover:bg-[rgb(143,6,6)] rounded-full absolute bottom-4 right-4"
                >
                  <i className="fa-solid fa-circle-user pr-10"></i>
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
