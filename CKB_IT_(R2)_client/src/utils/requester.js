import axios from "axios";

const HOST_URI = "http://localhost:3000"

// const HOST_URI = "https://ckb-it-round-2-server.onrender.com";

export async function postTeam(teamName, setLoading, setError) {
    const TEAM_CREATION_ROUTE = "api/teams/"
    const ReqURI = `${HOST_URI}/${TEAM_CREATION_ROUTE}`

    await axios.post(ReqURI, { name: teamName })


}

export async function getQuestions() {
    const QUESTIONS_FETCH_ROUTE = "api/questions/"
    const ReqURI = `${HOST_URI}/${QUESTIONS_FETCH_ROUTE}`

    let questions = await axios.get(ReqURI)
    console.log("questions ==========>", questions)
    return questions
}

export async function getAdminScore() {
    const ADMIN_SCORE_ROUT = "api/admin/getTeams";
    const ReqURI = `${HOST_URI}/${ADMIN_SCORE_ROUT}`
    let scores = await axios.get(ReqURI,{withCredentials:true})
    return scores;
}

export async function createQuestion(payload) {
  const ROUTE = "api/admin/create";
  const ReqURI = `${HOST_URI}/${ROUTE}`;
  return axios.post(ReqURI, payload, { withCredentials: true });
}

export async function updateQuestion(questionId, payload) {
  const ROUTE = `api/admin/update/${questionId}`;
  const ReqURI = `${HOST_URI}/${ROUTE}`;
  return axios.put(ReqURI, payload, { withCredentials: true });
}

export async function deleteQuestion(questionId) {
  const ROUTE = `api/admin/delete/${questionId}`;
  const ReqURI = `${HOST_URI}/${ROUTE}`;
  return axios.delete(ReqURI, { withCredentials: true });
}

export async function submitAnswer(teamName, code, language, questionNumber,questionId,submissionTime) {
    const SUBMIT_ANSWER_ROUTE = `api/questions/submit/${questionNumber}`;
    const ReqURI = `${HOST_URI}/${SUBMIT_ANSWER_ROUTE}`;

    return await axios.post(ReqURI, { teamName, code, language,submissionTime ,questionId})

}

export async function updateQuestionStatus(teamName, questionNumber) {
    const SUBMIT_ANSWER_ROUTE = `api/questions/status/${questionNumber}`;
    const ReqURI = `${HOST_URI}/${SUBMIT_ANSWER_ROUTE}`;

    return await axios.post(ReqURI, { teamName })

}

export async function login(username, password) {
  const LOGIN_ROUTE = "api/auth/login";
  const ReqURI = `${HOST_URI}/${LOGIN_ROUTE}`;

  return axios.post(
    ReqURI,
    { username, password },
    { withCredentials: true }
  );
}

export async function logout() {
  const LOGIN_ROUTE = "api/auth/logout";
  const ReqURI = `${HOST_URI}/${LOGIN_ROUTE}`;
  return axios.get(ReqURI);
}

