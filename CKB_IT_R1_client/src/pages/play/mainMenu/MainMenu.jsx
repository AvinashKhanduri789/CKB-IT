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
    <main className="min-h-screen bg-[#f5f6f8] text-slate-950 antialiased">
      <style>
        {`
          @keyframes byte-entry {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-4 sm:px-8 lg:px-8">
        <header className="border-b border-slate-200 pb-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="flex min-w-0 justify-start">
              <div className="flex h-12 w-full min-w-0 items-center rounded-md border border-slate-200 bg-white px-4 shadow-[0_1px_2px_rgba(15,23,42,0.05)] sm:w-[260px] md:w-[292px]">
                <img
                  src="/UUlogo.png"
                  alt="Uttaranchal University"
                  className="h-8 w-full object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-800 bg-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]">
                <img
                  src="/Codex-logo.png"
                  alt="Codex Club"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div className="leading-tight">
                <p className="font-['Montserrat'] text-sm font-bold tracking-[0.14em] text-slate-900 sm:text-[15px]">
                  CODEX CLUB
                </p>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={switchAdminMode}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 font-['Open_Sans'] text-sm font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-150 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#f5f6f8] active:translate-y-px sm:w-fit"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Admin
              </button>
            </div>
          </div>
        </header>

        <div
          className="grid flex-1 items-center gap-8 py-8 md:py-9 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-10 lg:py-10"
          style={{ animation: "byte-entry 360ms ease-out both" }}
        >
          <section className="max-w-xl">
            <div className="mb-6 h-0.5 w-16 bg-[#265f9f]" />
            <p className="mb-3 font-['Open_Sans'] text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
              Competition Access
            </p>
            <h1 className="font-['Montserrat'] text-5xl font-extrabold tracking-normal text-slate-950 sm:text-6xl lg:text-[60px] lg:leading-[1.02]">
              BYTE 2.0
            </h1>
            <p className="mt-4 max-w-[420px] font-['Open_Sans'] text-base leading-7 text-slate-600 sm:text-[17px]">
              Enter your assigned team number to begin the competition round.
            </p>
          </section>

          <section className="w-full">
            <form
              onSubmit={startGame}
              className="w-full overflow-hidden rounded-md border border-slate-300 bg-white shadow-[0_16px_34px_rgba(15,23,42,0.08)] lg:ml-auto"
            >
              <div className="border-b border-slate-200 bg-slate-50 px-7 py-6">
                <div className="mb-3 h-0.5 w-10 bg-[#265f9f]" />
                <p className="font-['Montserrat'] text-[17px] font-bold leading-5 text-slate-950">
                  Team Verification
                </p>
                <p className="mt-2 font-['Open_Sans'] text-sm leading-5 text-slate-600">
                  Official competition entry
                </p>
              </div>

              <div className="p-7">
                <div className="mb-6">
                  <label
                    htmlFor="team-number"
                    className="mb-2 block font-['Open_Sans'] text-sm font-semibold text-slate-800"
                  >
                    Team Number
                  </label>
                  <input
                    id="team-number"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter team number"
                    required
                    className="h-[52px] w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-['Open_Sans'] text-base font-semibold text-slate-950 outline-none transition duration-150 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-[#265f9f] focus:ring-[3px] focus:ring-[#265f9f]/15"
                  />
                </div>

                <button
                  type="submit"
                  className="h-[52px] w-full rounded-md border border-slate-950 bg-gradient-to-b from-slate-900 to-slate-950 px-5 py-3 font-['Open_Sans'] text-base font-bold text-white shadow-[0_10px_20px_rgba(15,23,42,0.20)] transition duration-150 hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-950 hover:shadow-[0_14px_24px_rgba(15,23,42,0.24)] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:translate-y-px active:from-slate-950 active:to-slate-950 active:shadow-[0_6px_14px_rgba(15,23,42,0.18)]"
                >
                  Start
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default MainMenu;
