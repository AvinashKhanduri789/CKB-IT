import axios from "axios";


const HOST_URI = "https://itutsav-ckb24.onrender.com"
// const HOST_URI = "http://localhost:8080"
const headers = {
    'ngrok-skip-browser-warning': true
}


export async function getQuestions() {
    const QUESTIONS_FETCH_ROUTE = "api/questions/fetch"
    const ReqURI = `${HOST_URI}/${QUESTIONS_FETCH_ROUTE}`

    let questions = await axios.get(ReqURI, { headers })
    return questions
}


export async function getTeams() {
    const TEAM_FETCH = 'api/team/fetch'
    const ReqURI = `${HOST_URI}/${TEAM_FETCH}`

    let response = await axios.get(ReqURI, { headers })
    return response
}


export async function getAdmins(adminData) {
    const ADMINS_ROUTE = 'api/admin/login'
    const ReqURI = `${HOST_URI}/${ADMINS_ROUTE}`

    let admins = await axios.post(ReqURI, {
        "name": adminData.name,
        "password": adminData.password
    }, { headers })
    if (admins.status == 200)
        return true
    return false
}

export async function addTeam(teamData) {
    const TEAM_ADD_ROUTE = 'api/team/update'
    const REQ_URI = `${HOST_URI}/${TEAM_ADD_ROUTE}`

    await axios.post(REQ_URI, teamData, { headers })
}

export async function updateQuestions(questionsArr) {
    const QUESTIONS_ROUTE = 'api/questions/update'
    const ReqURI = `${HOST_URI}/${QUESTIONS_ROUTE}`

    await axios.post(ReqURI, questionsArr, { headers }).then(res =>
        console.log(res)).catch(err => console.log(err))
}


export async function validateTeamName(inputValue, setTeam, setGameMode) {
    const VALIDATION_ROUTE = "";
    const RequestURI = `${HOST_URI}/${VALIDATION_ROUTE}`;
    await axios.post(ReqURI,inputValue,{headers}).then(res=>{
        if(res.status===201){
                setTeam(inputValue);
                setGameMode(1);
        }else{
            alert("Team name already exist");
        }
    }
        
    ).catch(err=>console.log(err))
}





