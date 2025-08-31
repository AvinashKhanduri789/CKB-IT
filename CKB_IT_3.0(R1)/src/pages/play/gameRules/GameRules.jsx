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
                <div className="text-5xl mt-12">  Code ke Boss Rules!</div> 
            </div>

            <br />
            <div className='text-3xl'> Preliminary Round - 30 minutes </div>
            <ul className="text-xl w-3/4 ml-5 mt-10">
                <li> 
                    This is a preliminary round consisting 20 questionsn under 30 minutes.
                </li>
                <li>
                    Given a program, assess it and debug it or choose the best option.
                </li>
            </ul>

            <br /> <br />
            <hr className='w-3/4'/>
            <br /> <br />

            <div className='text-3xl'> Contest Rules </div>
            <ul className="text-xl w-3/4 ml-5 mt-10">
                <li> Each team can have a maximum of two members. </li>
                <li> Only C, C++ and Java Programming Languages are allowed. </li>
                <li> The round’s results are not subject to discussion. </li>
                <li> The decision of the judges is final. </li>
            </ul>

            <br />
            <div className="flex flex-right mt-10 ml-60"> 
                <button className="py-3 px-4 rounded-lg bg-yellow-400 text-xl text-black" onClick={goback}> Go Back </button>
                <button className="ml-10 py-3 px-4 rounded-lg bg-green-500 text-xl text-white" onClick={startGame}> Round 1 </button>
                {/* <button className="ml-10 py-3 px-4 rounded-lg bg-red-400 text-xl text-white"> 
                    <a href='https://docs.google.com/document/d/1MpQOci0CW1sT0Vw-6-Ljc3ZJcUqk1-cFv-rkCL6YOEE/edit?usp=sharing' target="_blank" rel="noopener noreferrer"> Round 2 </a>
                </button> */}
            </div>

    
            

            <div className='mt-20'></div>
        </div>
    )
}

export default GameRules

