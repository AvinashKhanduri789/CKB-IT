import { useEffect, useState } from "react"
import { updateQuestions } from "../../../utils/requester"


const QuestionsMake = ({ setPageMode, questions, setQuestions, questionIndex, setQuestionIndex }) => { 
  const [questionTemp, setQuestionTemp] = useState(undefined)
  const [optionsTemp, setOptionsTemp] = useState(undefined)
  const [answerTemp, setAnswerTemp] = useState(undefined);


  function returnToPanel(){
    setPageMode(1)
  }

  //* buttons
  function saveChanges(){
    const updatedQuestion = {
      "question": questionTemp,
      "options": [...optionsTemp],
      "answer": answerTemp
    }
    setQuestions(oldQuestions=>{
      let newQuestions = [...oldQuestions]
      newQuestions[questionIndex]['question'] = updatedQuestion['question']
      newQuestions[questionIndex]['options'] = updatedQuestion['options']
      newQuestions[questionIndex]['answer'] = updatedQuestion['answer']
      return newQuestions
    })

    const questionsArr = {
      "questions": questions
    }
    updateQuestions(questionsArr)
    //console.log(questionsArr)
  }

  function previousQuestion(){
    if(questionIndex >= 1)
      setQuestionIndex(questionIndex-1)
  }

  function nextQuestion(){
    if(questionIndex < totalQuestions-1)
      setQuestionIndex(questionIndex+1)
  }

  //*forms value change
  function  questionChanger(event){
    let val = event.target.value
    setQuestionTemp(val)
  }

  function answerChanger(index){
    setAnswerTemp(index)
  }

  function optionChanger(event, index){
    let val = event.target.value;
    setOptionsTemp(oldOptionsTemp=>{
      let newOptionsTemp = [...oldOptionsTemp]
      newOptionsTemp[index] = val
      return newOptionsTemp
    })
  }

  const oldQuestion = questions[questionIndex]
  const totalQuestions = questions.length;

  //initialize default values for tmpQuestion
  useEffect(()=>{
    if(questionTemp == undefined){
      setQuestionTemp(oldQuestion['question'])
    }
    if(optionsTemp == undefined){
      let oldOptions = oldQuestion['options']
      setOptionsTemp(oldOptions)
    }
    if(answerTemp == undefined){
      let oldAnswer = oldQuestion['answer']
      setAnswerTemp(oldAnswer)
    }
  }, [])



  return (
    <div id='questionsMakeContainer'>
      <div className="text-2xl text-violet-300 back-btn" onClick={returnToPanel}> {'<'}  Back </div>
      <br />
      <div className="w-3/4 p-5 bg-white text-black ml-20" id='questions-modal'> 
        <div>
          <span className="text-lg font-bold"> Question </span>
          <span className="text-lg text-gray-600 font-bold float-right"> {questionIndex+1}/{totalQuestions} </span>
          <hr className="border border-black-700 my-2"/>
          <br />
          <textarea defaultValue={oldQuestion['question']} className="w-3/4 text-lg" id='questions-input' onChange={questionChanger} />

          <br /> <br />

          <div className="text-xl font-bold"> Options:  </div>

          <input className="text-lg text-black w-3/4 p-2 question-option my-5" defaultValue={oldQuestion['options'][0]} onChange={ (event)=>optionChanger(event, 0)  }/>
          
          <input className="text-lg text-black w-3/4 p-2 question-option my-5" defaultValue={oldQuestion['options'][1]} onChange={ (event)=>optionChanger(event, 1)  }/>

          <input className="text-lg text-black w-3/4 p-2 question-option my-5" defaultValue={oldQuestion['options'][2]} onChange={ (event)=>optionChanger(event, 2)  }/> 

          <input className="text-lg text-black w-3/4 p-2 question-option my-5" defaultValue={oldQuestion['options'][3]} onChange={ (event)=>optionChanger(event, 3)  }/> 

          <br />  <br /> 

          <div className="text-xl font-bold"> Select Answer </div>
          <div className="mt-4">
              <input  className="ml-4" type="radio" checked={answerTemp == 0} onChange={ ()=> answerChanger(0) }/>
              <label> 1st Option</label>

              <input className="ml-10" type="radio" checked={answerTemp == 1} onChange={ ()=> answerChanger(1) }/>
              <label> 2nd Option</label>

              <input className="ml-10" type="radio" checked={answerTemp == 2} onChange={ ()=> answerChanger(2) }/>
              <label> 3rd Option</label>

              <input className="ml-10" type="radio" checked={answerTemp == 3} onChange={ ()=> answerChanger(3) }/>
              <label> 4th Option</label>
          </div>

          <br />

          <div>
            <button className="p-2 text-lg text-black nav-btns mt-4" id='save-btn' onClick={saveChanges}> Save Changes </button>

            <button className=" ml-40 p-2 px-5 text-lg text-black nav-btns control-btns mt-4" onClick={previousQuestion}> Previous </button>

            <button className=" ml-20 p-2 px-3 text-lg text-black nav-btns control-btns mt-4" onClick={nextQuestion}> Next </button>
          </div>
          
        </div>
      </div>  
    </div>
  )
}

export default QuestionsMake