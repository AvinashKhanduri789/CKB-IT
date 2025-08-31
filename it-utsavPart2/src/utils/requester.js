import axios from "axios";

// const HOST_URI = "http://localhost:3000"

const HOST_URI = "https://ckb-it-round-2-server.onrender.com";

export async function postTeam(teamName) {
    const TEAM_CREATION_ROUTE = "api/teams/"
    const ReqURI = `${HOST_URI}/${TEAM_CREATION_ROUTE}`

    await axios.post(ReqURI, {name: teamName})
}

export async function getQuestions() {
    const QUESTIONS_FETCH_ROUTE = "api/questions/"
    const ReqURI = `${HOST_URI}/${QUESTIONS_FETCH_ROUTE}`

    let questions = await axios.get(ReqURI)
    console.log("questions ==========>", questions)
    return questions
}

export async function getAdminScore(){
    const ADMIN_SCORE_ROUT = "api/teams/admin/scores";
    const ReqURI = `${HOST_URI}/${ADMIN_SCORE_ROUT}`
    let scores = await axios.get(ReqURI)
    return scores;
}

export async function submitAnswer(teamName, code, language, questionNumber) {
    const SUBMIT_ANSWER_ROUTE = `api/questions/submit/${questionNumber}`;
    const ReqURI = `${HOST_URI}/${SUBMIT_ANSWER_ROUTE}`;
    // vijay adjust this data accouding to api structure
    await axios.post(ReqURI, { teamName, code, language })
    
}

export async function updateQuestionStatus(teamName, questionNumber) {
    const SUBMIT_ANSWER_ROUTE = `api/questions/status/${questionNumber}`;
    const ReqURI = `${HOST_URI}/${SUBMIT_ANSWER_ROUTE}`;
    // vijay adjust this data accouding to api structure
    await axios.post(ReqURI, { teamName })
    
}