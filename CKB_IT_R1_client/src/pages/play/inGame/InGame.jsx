// import { useEffect } from "react";
// import { formatTime } from "../../../utils/helpers";
// import CustomAlert from "../../../components/CustomAlert";

// function OptionItem({ index, label, selected, attempted, onSelect }) {
//   const optionKey = String.fromCharCode(65 + index);

//   return (
//     <div
//       role="radio"
//       aria-checked={selected}
//       aria-label={label}
//       tabIndex={0}
//       onClick={onSelect}
//       onKeyDown={(event) => {
//         if (event.key === "Enter" || event.key === " ") {
//           event.preventDefault();
//           onSelect();
//         }
//       }}
//       className={`group grid cursor-pointer grid-cols-[40px_1fr] gap-4 rounded-md border px-4 py-4 text-left transition duration-150 focus:outline-none focus:ring-[3px] focus:ring-[#265f9f]/15 ${
//         selected
//           ? "border-[#265f9f] bg-[#f4f8ff] shadow-[0_8px_18px_rgba(37,95,159,0.10)]"
//           : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
//       }`}
//     >
//       <span
//         className={`flex h-9 w-9 items-center justify-center rounded-md border font-['Open_Sans'] text-sm font-bold ${
//           selected
//             ? "border-[#265f9f] bg-[#265f9f] text-white"
//             : "border-slate-200 bg-slate-50 text-slate-500 group-hover:text-slate-800"
//         }`}
//       >
//         {optionKey}
//       </span>
//       <span className="self-center font-['Open_Sans'] text-[15.5px] font-semibold leading-7 text-slate-700 sm:text-base">
//         {label}
//       </span>
//       {attempted && selected && (
//         <span className="sr-only">Selected option {optionKey}</span>
//       )}
//     </div>
//   );
// }

// function QuestionBlock({ question }) {
//   return (
//     <section className="border-b border-slate-200 pb-6">
//       <p className="mb-3 font-['Open_Sans'] text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
//         Question
//       </p>
//       <pre className="whitespace-pre-wrap font-['Open_Sans'] text-xl font-semibold leading-9 tracking-[-0.01em] text-slate-950 sm:text-2xl sm:leading-10">
//         {question || "Loading question..."}
//       </pre>
//     </section>
//   );
// }

// function SidebarPanel({
//   attempts,
//   answers,
//   questionIndex,
//   totalQuestions,
//   attemptedCount,
//   remainingCount,
//   progress,
//   jumpQuestion,
// }) {
//   return (
//     <aside className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
//       <div className="mb-5 flex items-end justify-between gap-4">
//         <div>
//           <p className="font-['Open_Sans'] text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
//             Navigator
//           </p>
//           <h2 className="mt-2 font-['Geist','Satoshi','Montserrat',sans-serif] text-xl font-semibold tracking-[-0.01em] text-slate-950">
//             Questions List
//           </h2>
//         </div>
//         <p className="font-['Open_Sans'] text-sm font-semibold text-slate-500">
//           {attemptedCount}/{totalQuestions}
//         </p>
//       </div>

//       <div className="mb-5 flex gap-4 font-['Open_Sans'] text-xs font-semibold text-slate-500">
//         <span className="inline-flex items-center gap-2">
//           <span className="h-2 w-2 rounded-full bg-[#265f9f]" />
//           Attempted
//         </span>
//         <span className="inline-flex items-center gap-2">
//           <span className="h-2 w-2 rounded-full bg-slate-300" />
//           Open
//         </span>
//       </div>

//       <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
//         {attempts.map((attempt, index) => {
//           const isActive = index === questionIndex;
//           const answer = answers[index];

//           return (
//             <button
//               key={index}
//               type="button"
//               onClick={() => jumpQuestion(index)}
//               className={`h-12 rounded-md border font-['Open_Sans'] text-sm font-bold transition duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-[3px] focus:ring-[#265f9f]/15 ${
//                 isActive
//                   ? "border-slate-950 bg-slate-950 text-white shadow-[0_8px_16px_rgba(15,23,42,0.16)]"
//                   : attempt
//                     ? "border-[#265f9f]/25 bg-[#f4f8ff] text-[#265f9f]"
//                     : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
//               }`}
//             >
//               <span>Q{index + 1}</span>
//               {answer !== null && answer !== undefined && (
//                 <span className="ml-1 text-xs opacity-75">
//                   {String.fromCharCode(65 + answer)}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       <div className="mt-7">
//         <h3 className="mb-3 font-['Geist','Satoshi','Montserrat',sans-serif] text-base font-semibold tracking-[-0.01em] text-slate-950">
//           Progress Summary
//         </h3>
//         <div className="flex justify-between font-['Open_Sans'] text-sm font-semibold text-slate-600">
//           <span>Attempted: {attemptedCount}/{totalQuestions}</span>
//           <span>Remaining: {remainingCount}/{totalQuestions}</span>
//         </div>
//         <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
//           <div
//             className="h-full rounded-full bg-[#265f9f] transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>
//     </aside>
//   );
// }

// const InGame = ({
//   teamName,
//   questions,
//   answers,
//   setAnswers,
//   timers,
//   setTimers,
//   questionIndex,
//   setQuestionIndex,
//   setGameMode,
//   totalTimer,
//   setTotalTimer,
//   attempts,
//   setAttempts,
//   showAlert,
//   setShowAlert,
// }) => {
//   useEffect(() => {
//     initializeGame();
//   }, []);

//   const handleOptionChange = (pickIndex) => {
//     if (showAlert) return;

//     if (!attempts[questionIndex]) {
//       setAttempts((oldAttempts) => {
//         const newAttempts = [...oldAttempts];
//         newAttempts[questionIndex] = true;
//         return newAttempts;
//       });
//     }

//     setAnswers((prevAnswers) => {
//       const newAnswers = [...prevAnswers];
//       newAnswers[questionIndex] = pickIndex;
//       return newAnswers;
//     });
//     setTotalTimer((prevTime) => prevTime - 1);
//   };

//   const nextQuestion = () => {
//     if (questionIndex == questions.length - 1) {
//       setShowAlert(true);
//     } else {
//       setQuestionIndex((newIndex) => newIndex + 1);
//       setTotalTimer((prevTime) => prevTime - 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (questionIndex >= 1) {
//       setQuestionIndex((newIndex) => newIndex - 1);
//       setTotalTimer((prevTime) => prevTime - 1);
//     }
//   };

//   const jumpQuestion = (index) => {
//     if (index != questionIndex) {
//       setQuestionIndex(index);
//       setTotalTimer((prevTime) => prevTime - 1);
//     }
//   };

//   function alert_dontSubmit() {
//     setShowAlert(false);
//   }

//   function alert_doSubmit() {
//     setGameMode(3);
//     setShowAlert(false);
//   }

//   function initializeGame() {
//     if (answers.length < questions.length) {
//       const newAnswers = Array.from({ length: 20 }).fill(null);
//       setAnswers(newAnswers);
//     }

//     if (timers.length < questions.length) {
//       const newTimers = Array.from({ length: 20 }).fill(0);
//       setTimers(newTimers);
//     }

//     if (attempts.length < questions.length) {
//       const defaultAttempts = Array.from({ length: 20 }).fill(false);
//       setAttempts(defaultAttempts);
//     }
//   }

//   const currentQuestion = questions[questionIndex];
//   const totalQuestions = questions.length;
//   const attemptedCount = attempts.filter((attempt) => attempt).length;
//   const remainingCount = attempts.filter((attempt) => !attempt).length;
//   const progress = totalQuestions ? (attemptedCount / totalQuestions) * 100 : 0;
//   const isLowTime = totalTimer <= 300;

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTotalTimer((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const alertComponent = (
//     <CustomAlert
//       message="Are you sure you want to proceed?"
//       onYes={alert_doSubmit}
//       onNo={alert_dontSubmit}
//       id="alert-dialog"
//     />
//   );

//   return (
//     <main className="min-h-screen bg-[#f5f6f8] px-4 py-4 text-slate-950 antialiased sm:px-6 lg:px-8">
//       {showAlert && alertComponent}

//       <div className="mx-auto max-w-7xl">
//         <section className="rounded-lg border border-slate-200 bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
//           <header className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <p className="font-['Open_Sans'] text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
//                 Round 1 - Quiz Competition
//               </p>
//               <h1 className="mt-1 font-['Geist','Satoshi','Montserrat',sans-serif] text-xl font-semibold tracking-[-0.02em] text-slate-950">
//                 Team {teamName}
//               </h1>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 font-['Open_Sans'] text-sm font-bold text-slate-700">
//                 {questionIndex + 1}/{totalQuestions}
//               </div>
//               <div
//                 className={`rounded-md border px-4 py-2 font-['Roboto_Mono','Open_Sans',monospace] text-base font-bold tabular-nums tracking-[-0.02em] ${
//                   isLowTime
//                     ? "border-amber-300 bg-amber-50 text-amber-800"
//                     : "border-slate-200 bg-slate-950 text-white"
//                 }`}
//               >
//                 {formatTime(totalTimer)}
//               </div>
//             </div>
//           </header>

//           <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 lg:py-6">
//             <div className="min-w-0">
//               <QuestionBlock question={currentQuestion?.["question"]} />

//               <section className="py-6">
//                 <p className="mb-4 font-['Open_Sans'] text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
//                   Select one answer
//                 </p>
//                 <div className="space-y-3" role="radiogroup" aria-label="Answer options">
//                   {[0, 1, 2, 3].map((index) => (
//                     <OptionItem
//                       key={index}
//                       index={index}
//                       label={
//                         currentQuestion?.["options"]?.[index] ||
//                         "Loading option..."
//                       }
//                       selected={answers[questionIndex] === index}
//                       attempted={attempts[questionIndex]}
//                       onSelect={() => handleOptionChange(index)}
//                     />
//                   ))}
//                 </div>
//               </section>

//               <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
//                 <button
//                   type="button"
//                   className={`inline-flex h-[48px] items-center justify-center rounded-md border px-6 font-['Open_Sans'] text-base font-bold transition duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
//                     questionIndex === 0
//                       ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
//                       : "border-slate-300 bg-white text-slate-800 shadow-[0_6px_14px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 active:translate-y-px"
//                   }`}
//                   onClick={prevQuestion}
//                   disabled={questionIndex === 0}
//                 >
//                   ← Previous
//                 </button>

//                 <button
//                   type="button"
//                   className="inline-flex h-[48px] items-center justify-center rounded-md border border-slate-950 bg-gradient-to-b from-slate-900 to-slate-950 px-7 font-['Open_Sans'] text-base font-bold text-white shadow-[0_10px_20px_rgba(15,23,42,0.20)] transition duration-150 hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-950 hover:shadow-[0_14px_24px_rgba(15,23,42,0.24)] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:translate-y-px active:from-slate-950 active:to-slate-950 active:shadow-[0_6px_14px_rgba(15,23,42,0.18)]"
//                   onClick={nextQuestion}
//                 >
//                   {questionIndex === totalQuestions - 1
//                     ? "Submit Answers"
//                     : "Next →"}
//                 </button>
//               </div>
//             </div>

//             <SidebarPanel
//               attempts={attempts}
//               answers={answers}
//               questionIndex={questionIndex}
//               totalQuestions={totalQuestions}
//               attemptedCount={attemptedCount}
//               remainingCount={remainingCount}
//               progress={progress}
//               jumpQuestion={jumpQuestion}
//             />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default InGame;


import { useEffect } from "react";
import { formatTime } from "../../../utils/helpers";
import CustomAlert from "../../../components/CustomAlert";
import uuLogo from "../../../../public/UUlogo.png";
import codexLogo from "../../../../public/Codex-logo.png";

function OptionItem({ index, label, selected, attempted, onSelect }) {
  const optionKey = String.fromCharCode(65 + index);

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-label={label}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`group flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#265f9f]/30 ${
        selected
          ? "border-[#265f9f] bg-[#f0f6ff] shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
          selected
            ? "border-[#265f9f] bg-[#265f9f] text-white"
            : "border-gray-200 bg-gray-100 text-gray-600 group-hover:text-gray-800"
        }`}
      >
        {optionKey}
      </span>
      <span className="text-gray-800">{label}</span>
      {attempted && selected && (
        <span className="sr-only">Selected option {optionKey}</span>
      )}
    </div>
  );
}

function QuestionBlock({ question }) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Question
      </p>
      <p className="whitespace-pre-wrap text-xl font-semibold leading-relaxed text-gray-900">
        {question || "Loading question..."}
      </p>
    </div>
  );
}

function SidebarPanel({
  attempts,
  answers,
  questionIndex,
  totalQuestions,
  attemptedCount,
  remainingCount,
  progress,
  jumpQuestion,
}) {
  return (
    <div className="border-t border-gray-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Navigator
          </p>
          <h2 className="text-lg font-semibold text-gray-900">
            Questions List
          </h2>
        </div>
        <p className="text-sm font-semibold text-gray-500">
          {attemptedCount}/{totalQuestions}
        </p>
      </div>

      <div className="mb-5 flex gap-4 text-xs font-semibold text-gray-500">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#265f9f]" />
          Attempted
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          Unattempted
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
        {attempts.map((attempt, index) => {
          const isActive = index === questionIndex;
          const answer = answers[index];

          return (
            <button
              key={index}
              type="button"
              onClick={() => jumpQuestion(index)}
              className={`flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#265f9f]/30 ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                  : attempt
                    ? "border-[#265f9f]/30 bg-[#f0f6ff] text-[#265f9f]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {index + 1}
              {answer !== null && answer !== undefined && (
                <span className="ml-1 text-xs">
                  {String.fromCharCode(65 + answer)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold text-gray-900">
          Progress Summary
        </h3>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>Attempted: {attemptedCount}</span>
          <span>Remaining: {remainingCount}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#265f9f] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const InGame = ({
  teamName,
  questions,
  answers,
  setAnswers,
  timers,
  setTimers,
  questionIndex,
  setQuestionIndex,
  setGameMode,
  totalTimer,
  setTotalTimer,
  attempts,
  setAttempts,
  showAlert,
  setShowAlert,
}) => {
  useEffect(() => {
    initializeGame();
  }, []);

  const handleOptionChange = (pickIndex) => {
    if (showAlert) return;

    if (!attempts[questionIndex]) {
      setAttempts((oldAttempts) => {
        const newAttempts = [...oldAttempts];
        newAttempts[questionIndex] = true;
        return newAttempts;
      });
    }

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = pickIndex;
      return newAnswers;
    });
    setTotalTimer((prevTime) => prevTime - 1);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setShowAlert(true);
    } else {
      setQuestionIndex((newIndex) => newIndex + 1);
      setTotalTimer((prevTime) => prevTime - 1);
    }
  };

  const prevQuestion = () => {
    if (questionIndex >= 1) {
      setQuestionIndex((newIndex) => newIndex - 1);
      setTotalTimer((prevTime) => prevTime - 1);
    }
  };

  const jumpQuestion = (index) => {
    if (index !== questionIndex) {
      setQuestionIndex(index);
      setTotalTimer((prevTime) => prevTime - 1);
    }
  };

  function alert_dontSubmit() {
    setShowAlert(false);
  }

  function alert_doSubmit() {
    setGameMode(3);
    setShowAlert(false);
  }

  function initializeGame() {
    if (answers.length < questions.length) {
      const newAnswers = Array.from({ length: 20 }).fill(null);
      setAnswers(newAnswers);
    }

    if (timers.length < questions.length) {
      const newTimers = Array.from({ length: 20 }).fill(0);
      setTimers(newTimers);
    }

    if (attempts.length < questions.length) {
      const defaultAttempts = Array.from({ length: 20 }).fill(false);
      setAttempts(defaultAttempts);
    }
  }

  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;
  const attemptedCount = attempts.filter((attempt) => attempt).length;
  const remainingCount = attempts.filter((attempt) => !attempt).length;
  const progress = totalQuestions ? (attemptedCount / totalQuestions) * 100 : 0;
  const isLowTime = totalTimer <= 300;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const alertComponent = (
    <CustomAlert
      message="Are you sure you want to submit your answers?"
      onYes={alert_doSubmit}
      onNo={alert_dontSubmit}
      id="alert-dialog"
    />
  );

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {showAlert && alertComponent}

      {/* Full width layout - takes entire screen */}
      <div className="flex min-h-screen w-full flex-col">
        {/* Header with Logos */}
        <div className=" px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={uuLogo} alt="UTU Logo" className="h-12 w-auto object-contain" />
              
            </div>
            <div className="flex items-center gap-3">
              
              <img src={codexLogo} alt="Codex Logo" className=" bg-black h-16 rounded-lg w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Main Content - Full screen quiz area */}
        <div className="flex-1 px-4 py-6 md:px-8 lg:px-12">
          {/* Full height quiz container - no max-width constraint, fills the space */}
          <div className="flex h-full flex-col">
            {/* Quiz Header */}
            <div className="rounded-t-lg bg-white shadow-md">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      Round 1 - Quiz Competition
                    </h1>
                    <p className="text-sm text-gray-500">Team {teamName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-gray-100 px-4 py-2 text-center">
                      <p className="text-xs text-gray-500">Question</p>
                      <p className="text-xl font-bold text-gray-800">
                        {questionIndex + 1}/{totalQuestions}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-100 px-4 py-2 text-center">
                      <p className="text-xs text-gray-500">Time Left</p>
                      <p
                        className={`text-xl font-mono font-bold tabular-nums ${
                          isLowTime ? "text-red-600" : "text-gray-800"
                        }`}
                      >
                        {formatTime(totalTimer)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid - expands to fill available space */}
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px]">
                {/* Left Column - Question Area */}
                <div>
                  <QuestionBlock question={currentQuestion?.question} />

                  <div className="mt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Select the correct option
                    </p>
                    <div className="space-y-2.5" role="radiogroup">
                      {[0, 1, 2, 3].map((index) => (
                        <OptionItem
                          key={index}
                          index={index}
                          label={
                            currentQuestion?.options?.[index] ||
                            "Loading option..."
                          }
                          selected={answers[questionIndex] === index}
                          attempted={attempts[questionIndex]}
                          onSelect={() => handleOptionChange(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
                    <button
                      type="button"
                      className={`flex h-10 items-center justify-center rounded-lg px-5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#265f9f]/30 ${
                        questionIndex === 0
                          ? "cursor-not-allowed bg-gray-100 text-gray-400"
                          : "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow"
                      }`}
                      onClick={prevQuestion}
                      disabled={questionIndex === 0}
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      className="flex h-10 items-center justify-center rounded-lg bg-[#0a2b4e] px-6 font-medium text-white shadow-sm transition-all hover:bg-[#0f3a66] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#265f9f]/30"
                      onClick={nextQuestion}
                    >
                      {questionIndex === totalQuestions - 1
                        ? "Submit"
                        : "Next →"}
                    </button>
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <SidebarPanel
                  attempts={attempts}
                  answers={answers}
                  questionIndex={questionIndex}
                  totalQuestions={totalQuestions}
                  attemptedCount={attemptedCount}
                  remainingCount={remainingCount}
                  progress={progress}
                  jumpQuestion={jumpQuestion}
                />
              </div>

              {/* Footer Note */}
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center rounded-b-lg">
                <p className="text-xs text-gray-500">
                  ⚠️ Do not refresh the page or use browser navigation. This may lead to disqualification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InGame;