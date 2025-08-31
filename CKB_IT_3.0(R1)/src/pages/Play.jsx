import './../styles/css/Play.css';
// import './../styles/css/firstPage.css'
import InGame from './play/inGame/InGame';
import MainMenu from './play/mainMenu/MainMenu';
import EndGame from './play/endGame/EndGame';
import GameRules from './play/gameRules/GameRules';
import { useEffect, useState } from 'react';
import { getQuestions } from '../utils/requester';


const Play = ({ setPlaying, totalTimer, setTotalTimer }) => {
    const [modeIndex, changePlayMode] = useState(0);
    const [teamName, changeTeamName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timers, setTimers] = useState([]);
    const [attempts, setAttempts] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    

    function setGameMode(newMode){
        changePlayMode(newMode)
    }
    function setTeamName(team){
        changeTeamName(team)
        console.log(teamName)
    }

    async function fetchQuestions(){
        let response = await getQuestions()
        let data = response['data']['data']
        setQuestions((ques)=> ques = data)
    }


    useEffect(()=>{
        fetchQuestions();
    }, [])


    const MainMenuComponent = () => <MainMenu setGameMode={setGameMode} setTeam={setTeamName}/>
    const InGameComponent = () =>   <InGame 
                                        teamName={teamName} questions={questions} 
                                        answers={answers} setAnswers={setAnswers}
                                        timers={timers} setTimers={setTimers}
                                        questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}
                                        setGameMode={setGameMode}
                                        totalTimer={totalTimer} setTotalTimer={setTotalTimer}
                                        attempts={attempts} setAttempts={setAttempts}
                                        showAlert={showAlert} setShowAlert={setShowAlert}
                                    />

    const GameRulesComponent = () => <GameRules 
                                        setGameMode={setGameMode}
                                    />

    const EndGameComponent = () => <EndGame 
                                        teamName={teamName} questions={questions} 
                                        answers={answers} timers={timers} totalTimer={totalTimer}
                                        attempts={attempts}
                                    />
    const modes = [MainMenuComponent, GameRulesComponent, InGameComponent, EndGameComponent]
    const CurrentMode = modes[modeIndex];

    useEffect(()=>{ 
        //end game
        if(modeIndex == 2 && totalTimer <= 0)
            setGameMode(3)
    })
    
    
    return (
        <div className={modeIndex > 0 ? "ml-20" : ""}>
            <CurrentMode />
        </div>
    );
}   

export default Play