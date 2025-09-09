import codexLogo  from './../../../assets/logo/codexLogo_nobg.png'


const GameRules = ({ setGameMode }) =>{

    function goback(){
        setGameMode(0)
    }

    function startGame(){
        setGameMode(2)
    }



    return (
        <div id='gameRules-container' className="ml-40 mt-3 animate__animated animate__slideInLeft">
            <div className='flex flex-right'>
                <img 
                    id='codex-logo'
                    src={codexLogo}
                />
                <div className="text-5xl mt-12">  BYTE 2.0 Rules!</div> 
            </div>

            <br />
            <div className='text-3xl'> Preliminary Round - 30 minutes </div>
            <ul className="text-xl w-3/4 ml-5 mt-10">
                <li> 
                    This is the first round, a pseudo code–based quiz where participants will be tested on their foundational knowledge of DSA, C, C++, and Python.
                </li>
                <li>
                   The quiz will consist of 20 multiple-choice questions to be answered within 30 minutes.
                </li>
                <li>Each question carries one mark.</li>
                <li>Winners will be announced based on the total marks earned. In case of a tie, the submission time will be considered.</li>
            </ul>

            <br /> <br />
            <hr className='w-3/4'/>
            <br /> <br />

            <div className='text-3xl'> Contest Rules </div>
            <ul className="text-xl w-3/4 ml-5 mt-10">
                <li> Each team can have a maximum of two members. </li>
                <li> The round’s results are not subject to discussion. </li>
                <li> The decision of the judges is final. </li>
                <li className='text-rose-600'>DO NOT REFRESH THE PAGE !!!</li>
            </ul>

            <br />
            <div className="flex justify-between mt-10"> 
                <button className="py-3 px-4 rounded-lg bg-yellow-400 text-xl text-black" onClick={goback}> Go Back </button>
                <button className="ml-10 py-3 px-4 rounded-lg bg-green-500 text-xl text-white mr-[30%]" onClick={startGame}> Round 1 </button>
                {/* <button className="ml-10 py-3 px-4 rounded-lg bg-red-400 text-xl text-white"> 
                    <a href='https://docs.google.com/document/d/1MpQOci0CW1sT0Vw-6-Ljc3ZJcUqk1-cFv-rkCL6YOEE/edit?usp=sharing' target="_blank" rel="noopener noreferrer"> Round 2 </a>
                </button> */}
            </div>

    
            

            <div className='mt-20'></div>
        </div>
    )
}

export default GameRules

