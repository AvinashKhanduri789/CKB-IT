import { useEffect, useState } from "react"
import { sortArrayOfObjects } from "../../../utils/helpers"



const ResultsFull = ({ teams, onClickHandler }) =>{

  function countAttempts(attemptsData){
    let attempts = 0;
    attemptsData.forEach(attempt => {
      if(attempt)
        attempts++;
    });
    return attempts
  }

function formatTimer(seconds){
  let mins = Math.floor(seconds/60)
  let remSecs = seconds - (60*mins);
  return `${mins} min:${remSecs} sec`
}

  //console.log(teams)
  return (
    <div>
          {
            teams.map((team, index) => (
                    <div className="my-1 text-white text-xl p-3 w-6/12 team-container" 
                        key={index} onClick={ ()=> onClickHandler(index) }>
                          <span> <b className="mr-5">Team Name </b> {team.name}  </span>
                          <span className="float-right text-md text-green-400"> { formatTimer(team.totalTimeTaken) }  </span>
                          <br /> <br />
                          <div className="text-green-500">
                            <b className="mr-5">Total Score </b> {team.totalScore}/{team.answers.length} 
                          </div> 
                          <div className="text-yellow-400">
                            <b className="mr-5">Attempted: </b> { countAttempts(team['attempted']) }
                          </div>
                        <hr className="my-3"/>
                    </div>
            ))
          }
    </div>
  )
}




const ResultsDepth = ({ teamData, questions }) =>{


  function generateOptions(option, question, questionIndex, optionIndex){
    //*question not attempted -> options have no color
    if(!teamData['attempted'][questionIndex]){
      return (<div key={optionIndex}> {optionIndex+1}.  <span className="ml-5" > {option}</span> </div>)
    }
    else{
      //current option is the one user picked
      if(optionIndex == teamData['answers'][questionIndex]){
        if(teamData['answers'][questionIndex] == question['answer']){
          //correct pick
          return (<div key={questionIndex}> {questionIndex+1}.  <span className="ml-5 bg-green-500 picked-answer px-1" > {option}</span> </div>)
        }else{
          //wrong pick
          return (<div key={questionIndex}> {questionIndex+1}.  <span className="ml-5 bg-red-500 picked-answer px-1"> {option}</span> </div>)
        }       
      }
      //other options 
      else{
        return (<div key={optionIndex}> {optionIndex+1}.  <span className="ml-5" > {option}</span> </div>)
      }
    }
  }


  return (
    <div>
      <br/><br/><br/>
      {
        questions.map((question, index) => (
          <div className="mb-10 text-white text-xl p-3 w-6/12 answer-container" key={index}>
            <div className="text-lg">
              <pre className="text-allow-whitespace">
                { 
                  (teamData['attempted'][index]) ? 
                  (question['question']) :
                  (<span className="bg-yellow-400 p-1 text-black"> {question['question']} </span>) 
                }
              </pre>
            </div>
            
            <div className="mt-3">
              {
                question['options'].map((option, questionIndex) =>(
                  generateOptions(option, question, index, questionIndex)
                ))
              }
            </div>

            <hr className="my-3"/>
          </div>
        ))
      }
    </div>
  )
}




const Results = ({ setPageMode, teams, setTeams, questions,s}) => {

  const [viewState, setViewState] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    console.log("teams before sorting:", teams);
  
    const sortedTeams = [...teams].sort((a, b) => {
      // Sort by totalScore in descending order (highest score first)
      if (a.totalScore !== b.totalScore) {
        return b.totalScore - a.totalScore; // Higher score first
      }
  
      // If scores are the same, sort by totalTimeTaken in ascending order (lower time first)
      return a.totalTimeTaken - b.totalTimeTaken;
    });
  
    // If sorted array is different from current teams, update state
    if (JSON.stringify(teams) !== JSON.stringify(sortedTeams)) {
      console.log("Updating teams with sorted data");
      setTeams(sortedTeams);
    }
  }, [teams]); // Trigger this whenever `teams` changes
  
  

  
  function returnToPanel(){
    //if in depth -> go to full overview
    if(viewState == 1){
      setViewState(0)
    }
    //if in overview -> go back to panel
    else
      setPageMode(1)
  }

  function resultsClick(index){
    setSelectedIndex(index);
    setViewState(1)
  }



  return (
    <div className="ml-40 mt-5" id="resultsContainer">
        <div className="text-2xl text-violet-300 back-btn" onClick={returnToPanel}> {'<'}  Back </div>
        <div className="mt-5 ml-20">
          <span className="text-4xl">View Results</span>
          {
              (viewState == 0) ? (
                                <span className="ml-10">
                                  <span className="text-2xl text-gray-500"> (Sorted by Score & Time) </span>
                                  <br/> 
                                  <div className="text-gray-400 text-lg"> -  Click on Team to View Details by Each Question </div>
                                </span>
                                ):(
                                  <span className="ml-10">
                                    <span className="text-2xl text-gray-500"> For Team - {teams[selectedIndex]['name'] }  </span>
                                  </span>
                                )
          }
          

          <br /> <br />

          {
            (viewState == 0)  ? (<ResultsFull teams={teams} onClickHandler={resultsClick}/>)
                              : (<ResultsDepth teamData={teams[selectedIndex]} questions={questions}/>)
          }

        </div>
  
    </div>
  )
}

export default Results