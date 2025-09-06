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
          /* All custom styles moved here for compatibility with older Tailwind */
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
      
      {/* Background image class from CSS file */}
      <div className="bg-cover bg-center w-screen h-screen mainmenu-bg">
        {/* added dark filter */}
        <div className="w-full h-full bg-black bg-opacity-30 pt-5">
          {/* Nav - logo and USCS */}
          <div className="w-full flex justify-around items-center absolute top-16 px-[100px]">
            {/* logo */}
            <div className="bg-white py-2 w-80 flex justify-center rounded-full logo-shadow">
              <img
                className="h-10"
                src="./UUlogo.png"
                alt="Uttaranchal University logo"
              />
            </div>

            {/* Heading USCS */}
            <div className="uppercase front-page-font-orbitron text-3xl text-white font-bold tracking-wide uscs-heading">
              Uttaranchal School Of Computing Sciences
            </div>
          </div>

          {/* Container main*/}
          <div className="w-screen h-4/5 mt-24 flex justify-center items-center">
            
            {/* content container */}
            <div className="h-5/6 w-5/6 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl container-shadow flex">
              {/* content div*/}
              <div className="flex-1 flex ml-16 flex-col justify-center items-center p-8">
                {/* logo and club shit */}
                <div className="flex h-24 w-full">
                  {/* logo */}
                  <div
                    className="w-24 h-full bg-black bg-opacity-20 p-4 rounded-2xl border border-cyan-500 codex-club-bg-shadow animate-pulse ease-in-out duration-500"
                  >
                    <img src="/Codex-logo.png" alt="codex club logo" />
                  </div>

                  <div className="flex flex-col ml-6 py-3">
                    <div className="flex-2 text-5xl text-cyan-200 front-page-font-open-sans font-bold">CODEX</div>
                    <div className="flex-1 text-4xl text-cyan-600 front-page-font-open-sans font-medium">CLUB</div>
                  </div>
                </div>

                <div className="w-full my-4">
                  <h1 className="front-page-font-orbitron text-8xl font-bold mt-8 mb-2 text-cyan-300 byte-title">BYTE 2.O</h1>
                  <p className="front-page-font-montserrat font-semibold text-2xl text-cyan-200">
                    BOOST YOUR TECHNICAL EXCELLENCE
                  </p>
                </div>

                <div className="w-full">
                  <p className="uppercase my-8 front-page-font-montserrat font-medium text-3xl text-amber-200 coding-title">A premier Coding Contest</p>
                </div>
              </div>

              {/* form div */}
              <div className="flex flex-1 m-5 justify-center items-center flex-col">
                {/* Main form */}
                <form 
                  onSubmit={startGame} 
                  className="w-4/5 py-[60px] bg-black bg-opacity-20 rounded-2xl form-shadow border-2 border-cyan-500 flex flex-col justify-evenly items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter Team Number : "
                    required
                    className="w-4/5 border-2 front-page-font-open-sans font-medium border-cyan-500 h-14 rounded-2xl text-center text-2xl text-white bg-transparent "
                  />
                  <button 
                    type="submit" 
                    className="w-4/5 h-14 mt-8 front-page-font-open-sans font-medium rounded-2xl text-center text-2xl text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:opacity-80">
                    START
                  </button>
                </form>

                {/* Admin Button */}
                <button 
                  type="button" 
                  onClick={switchAdminMode} 
                  className="py-2 px-10 front-page-font-open-sans font-medium text-xl text-white bg-red-600 bg-opacity-60 admin-text-shadow border-2 border-white border-opacity-50 hover:bg-red-800 rounded-full absolute bottom-4 right-4">
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
