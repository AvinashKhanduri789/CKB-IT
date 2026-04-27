import codexLogo from "./../../../assets/logo/codexLogo_nobg.png";

const preliminaryRules = [
  "This is the first round, a pseudo code-based quiz where participants will be tested on their foundational knowledge of DSA, C, C++, and Python.",
  "The quiz will consist of 20 multiple-choice questions to be answered within 30 minutes.",
  "Each question carries one mark.",
  "Winners will be announced based on the total marks earned. In case of a tie, the submission time will be considered.",
];

const contestRules = [
  "Each team can have a maximum of two members.",
  "The round's results are not subject to discussion.",
  "The decision of the judges is final.",
];

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3 5 6v5c0 4.5 2.9 8.5 7 10 4.1-1.5 7-5.5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-amber-700"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 8v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 12H5m6 6-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RuleItem({ index, children }) {
  return (
    <li className="grid grid-cols-[36px_1fr] gap-4 border-b border-slate-200 py-5 last:border-b-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 font-['Open_Sans'] text-sm font-semibold tabular-nums text-slate-500">
        {index}
      </span>
      <p className="max-w-[58ch] font-['Open_Sans'] text-[15.5px] leading-8 text-slate-600 sm:text-base sm:leading-[1.85]">
        {children}
      </p>
    </li>
  );
}

function RulesColumn({ icon, title, children }) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-4">
        {icon}
        <h2 className="font-['Geist','Satoshi','Montserrat',sans-serif] text-xl font-semibold tracking-[-0.01em] text-slate-950 sm:text-[23px]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

const GameRules = ({ setGameMode }) => {
  function goback() {
    setGameMode(0);
  }

  function startGame() {
    setGameMode(2);
  }

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-5 py-5 text-slate-950 antialiased sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="flex min-w-0 justify-start">
              <img
                src="/UUlogo.png"
                alt="Uttaranchal University"
                className="h-12 max-w-full object-contain"
              />
            </div>

            <div className="flex items-center gap-5 md:justify-center">
              <div className="hidden h-10 w-px bg-slate-200 md:block" />
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-800 bg-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.14)]">
                <img
                  src={codexLogo}
                  alt="Codex Club"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <p className="font-['Geist','Satoshi','Montserrat',sans-serif] text-base font-semibold tracking-[0.22em] text-slate-950">
                CODEX CLUB
              </p>
            </div>

            <div className="hidden md:block" />
          </div>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-[0_22px_70px_rgba(15,23,42,0.10)] sm:px-10 lg:px-12 lg:py-12">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
              <img
                src={codexLogo}
                alt="Codex Club"
                className="h-14 w-14 object-contain"
              />
            </div>
            <div className="hidden h-14 w-px bg-slate-300 sm:block" />
            <h1 className="font-['Geist','Satoshi','Montserrat',sans-serif] text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
              BYTE 2.0 Rules!
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-12">
            <RulesColumn
              icon={<ClockIcon />}
              title="Preliminary Round - 30 minutes"
            >
              <ol>
                {preliminaryRules.map((rule, index) => (
                  <RuleItem key={rule} index={index + 1}>
                    {rule}
                  </RuleItem>
                ))}
              </ol>
            </RulesColumn>

            <div className="hidden bg-slate-200 lg:block" />

            <RulesColumn icon={<ShieldIcon />} title="Contest Rules">
              <ol>
                {contestRules.map((rule, index) => (
                  <RuleItem key={rule} index={index + 1}>
                    {rule}
                  </RuleItem>
                ))}
                <li className="grid grid-cols-[36px_1fr] gap-4 py-5">
                  <WarningIcon />
                  <p className="font-['Open_Sans'] text-[15.5px] font-bold leading-8 tracking-[0.01em] text-amber-700 sm:text-base">
                    4. DO NOT REFRESH THE PAGE !!!
                  </p>
                </li>
              </ol>
            </RulesColumn>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goback}
              className="inline-flex h-[52px] items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-8 font-['Open_Sans'] text-base font-bold text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.10)] transition duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:translate-y-px sm:min-w-44"
            >
              <ArrowLeftIcon />
              Go Back
            </button>

            <button
              type="button"
              onClick={startGame}
              className="inline-flex h-[52px] items-center justify-center gap-4 rounded-md border border-slate-950 bg-gradient-to-b from-slate-900 to-slate-950 px-8 font-['Open_Sans'] text-base font-bold text-white shadow-[0_12px_24px_rgba(15,23,42,0.22)] transition duration-150 hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-950 hover:shadow-[0_16px_30px_rgba(15,23,42,0.26)] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:translate-y-px active:from-slate-950 active:to-slate-950 active:shadow-[0_8px_16px_rgba(15,23,42,0.20)] sm:min-w-72"
            >
              Proceed to Round 1
              <ArrowRightIcon />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GameRules;
