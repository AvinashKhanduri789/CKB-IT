import Login from './admin/login/Login'
import AdminPanel from './admin/menu/AdminPanel'
import QuestionsMake from './admin/questionsMake/QuestionsMake'
import Results from './admin/viewResults/Results'
import { useEffect, useState } from 'react'
import './../styles/css/Admin.css'
import { getQuestions, getTeams } from '../utils/requester'
import { removeKey } from '../utils/helpers'


async function loadQuestions(setQuestions){
  let questionsResponse = getQuestions()
  questionsResponse.then(res=>{
    let data = res['data']['data']
    setQuestions(data)
  })
}

async function loadTeams(setTeams){
  let teamsResponse = getTeams()
  console.log("Teams in Admin", teamsResponse)
  teamsResponse.then(res=>{
    let data = res['data']['data']
    data = removeKey(data, '_id')
    data = removeKey(data, '__v')
    setTeams(data)
  })
}



const Admin = () => {
  const [isLogged, setLogged] = useState(false)
  const [pageMode, setPageMode] = useState(1) 
  const [questions, setQuestions] = useState([])
  const [teams, setTeams] = useState([])
  const [s, setS] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0)

  const LoginComponent = () => <Login setLogged={setLogged} setPageMode={setPageMode}/>
  const PanelComponent = () => <AdminPanel setPageMode={setPageMode} setS={setS}/>
  const QuestionsMakeComponent = () =>  <QuestionsMake 
                                          setPageMode={setPageMode}
                                          questions={questions} setQuestions={setQuestions}
                                          questionIndex={questionIndex} setQuestionIndex={setQuestionIndex}
                                        />
  const ResultsViewComponent = () =>  <Results 
                                        setPageMode={setPageMode} 
                                        s={s}
                                        teams={teams} 
                                        setTeams={setTeams}
                                        questions={questions}
                                      />

  const AdminComponents = [LoginComponent, PanelComponent, QuestionsMakeComponent, ResultsViewComponent]
  const CurrentComponent = AdminComponents[pageMode]

  

  useEffect(()=>{
    loadQuestions(setQuestions)
    loadTeams(setTeams)
    
    if(!isLogged)
      setPageMode(0)
  },[])


  return (
    <div className="ml-40">
      <br /> <br /> <br /> <br />
      <CurrentComponent />
    </div>
  )
}

export default Admin