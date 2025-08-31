import ScoreCard from "../../components/UserScore";
import { getAdminScore } from "../../utils/requester";
import { useEffect,useState } from "react";

const convertMillisecondsToTime = (timeTaken) => {
    // Extract timestamps from the object
    const timestamps = [
        new Date(timeTaken.question1).getTime(),
        new Date(timeTaken.question2).getTime(),
        new Date(timeTaken.question3).getTime()
    ];

    // Check if any timestamp is NaN
    if (timestamps.some(ts => isNaN(ts))) {
        console.error("One or more timestamps are invalid:", timestamps);
        return "0 min 0 sec"; // Return 0 if any timestamp is invalid
    }

    if (timestamps.length < 2) return "0 min 0 sec"; // Not enough data to calculate time

    // Calculate the difference in milliseconds
    const startTime = timestamps[0]; // First submission time
    const endTime = timestamps[timestamps.length - 1]; // Last submission time
    const differenceInMilliseconds = endTime - startTime;

    // Convert to minutes and seconds
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Return formatted string
    return `${minutes} min ${seconds} sec`;
};


const AdminPage = ()=>{
    const [data,setData] = useState([]);

    useEffect(()=>{
        const score = getAdminScore().then(resp => {
            console.log("resp", resp.data)
            setData(resp.data)
        });
    },[]);

    return(
        <>
        <div className=" min-h-screen bg-gray-900 flex flex-col items-center">
            <p className=" font-bold text-[2rem] " style={{marginTop:"3rem"}}>Admin Pannel</p>
            
            {data.map((item, index) => (
                <ScoreCard 
                    key={index} 
                    teamName={item.teamName} 
                    score={item.totalScore} 
                    timeTaken={convertMillisecondsToTime(item.timeStamps)} // Get formatted time string
                />
            ))}
            
        </div>
        </>
    )
}


export default AdminPage;