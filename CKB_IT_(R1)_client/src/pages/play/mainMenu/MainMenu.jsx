import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainMenu({ setGameMode, setTeam }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => setInputValue(event.target.value);

  const startGame = (event) => {
    event.preventDefault();
    setTeam(inputValue);
    setGameMode(1);
    console.log("Team ID:", inputValue);
  };

  const switchAdminMode = () => navigate("/admin");

  return (
    <>
      <style>
        {`
          .mainmenu-bg {
            background-image: url("/bg.png");
          }
          .uscs-heading {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
          }
          .codex-club-bg-shadow {
            box-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
          }
          .container-shadow {
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
          }
          .logo-shadow {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.7);
          }
          .byte-title {
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.7);
          }
          .coding-title {
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
          }
          .form-shadow {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
          .admin-text-shadow {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
          }
          .front-page-font-orbitron {
            font-family: 'Orbitron', sans-serif;
          }
          .front-page-font-open-sans {
            font-family: 'Open Sans', sans-serif;
          }
          .front-page-font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>

      {/* Background */}
      <div className="bg-cover bg-center w-screen h-screen mainmenu-bg overflow-x-hidden">
        {/* dark filter */}
        <div className="w-full h-full bg-black bg-opacity-30 pt-5">
          {/* Navbar */}
        {/* Navbar */}
<div className="w-full hidden md:flex justify-around items-center absolute top-16 px-[100px]">
  {/* logo */}
  <div className="bg-white py-2 w-80 flex justify-center rounded-full logo-shadow">
    <img
      className="h-10"
      src="./UUlogo.png"
      alt="Uttaranchal University logo"
    />
  </div>

  {/* Heading */}
  <div className="uppercase front-page-font-orbitron text-3xl text-white font-bold tracking-wide uscs-heading">
    Uttaranchal School Of Computing Sciences
  </div>
</div>


          {/* Main container */}
          <div className="w-screen h-[80%] mt-28 md:mt-24 flex justify-center items-center px-4">
            <div className="h-auto md:h-5/6 w-full md:w-5/6 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl container-shadow flex flex-col md:flex-row">
              {/* Left content */}
              <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-8">
                {/* Club logo */}
                <div className="flex flex-col sm:flex-row items-center h-auto w-full gap-4 md:gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-black bg-opacity-20 p-4 rounded-2xl border border-cyan-500 codex-club-bg-shadow animate-pulse ease-in-out duration-500">
                    <img src="/Codex-logo.png" alt="codex club logo" />
                  </div>

                  <div className="flex flex-col">
                    <div className="text-4xl md:text-5xl text-cyan-200 front-page-font-open-sans font-bold">
                      CODEX
                    </div>
                    <div className="text-3xl md:text-4xl text-cyan-600 front-page-font-open-sans font-medium">
                      CLUB
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="w-full my-4 text-center md:text-left">
                  <h1 className="front-page-font-orbitron text-5xl sm:text-6xl md:text-8xl font-bold mt-6 md:mt-8 mb-2 text-cyan-300 byte-title">
                    BYTE 2.O
                  </h1>
                  <p className="front-page-font-montserrat font-semibold text-lg sm:text-xl md:text-2xl text-cyan-200">
                    BOOST YOUR TECHNICAL EXCELLENCE
                  </p>
                </div>

                <div className="w-full text-center md:text-left">
                  <p className="uppercase my-6 md:my-8 front-page-font-montserrat font-medium text-xl sm:text-2xl md:text-3xl text-amber-200 coding-title">
                    A premier Coding Contest
                  </p>
                </div>
              </div>

              {/* Right form */}
              <div className="flex flex-1 m-4 md:m-5 justify-center items-center flex-col relative">
                <form
                  onSubmit={startGame}
                  className="w-full sm:w-4/5 py-10 sm:py-[60px] bg-black bg-opacity-20 rounded-2xl form-shadow border-2 border-cyan-500 flex flex-col justify-evenly items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter Team Number : "
                    required
                    className="w-4/5 border-2 front-page-font-open-sans font-medium border-cyan-500 h-12 sm:h-14 rounded-2xl text-center text-lg sm:text-2xl text-white bg-transparent"
                  />
                  <button
                    type="submit"
                    className="w-4/5 h-12 sm:h-14 mt-6 sm:mt-8 front-page-font-open-sans font-medium rounded-2xl text-center text-lg sm:text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-80"
                  >
                    START
                  </button>
                </form>

                {/* Admin button */}
                <button
                  type="button"
                  onClick={switchAdminMode}
                  className="py-2 px-6 sm:px-10 front-page-font-open-sans font-medium text-lg sm:text-xl text-white bg-red-600 bg-opacity-60 admin-text-shadow border-2 border-white border-opacity-50 hover:bg-red-800 rounded-full mt-6 md:mt-0 md:absolute md:bottom-4 md:right-4"
                >
                  <i className="fa-solid fa-circle-user pr-2"></i>
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

export default MainMenu;
