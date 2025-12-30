import React, { useState, useEffect } from 'react';
import { getAdminScore } from '../../utils/requester';
import ScoreCard from '../../components/UserScore';

const convertMillisecondsToTime = (timeStamps) => {
    if (!timeStamps) return "0 min 0 sec";

    // Extract timestamps from the object
    const timestamps = [
        timeStamps.question1 ? new Date(timeStamps.question1).getTime() : NaN,
        timeStamps.question2 ? new Date(timeStamps.question2).getTime() : NaN,
        timeStamps.question3 ? new Date(timeStamps.question3).getTime() : NaN
    ];

    // Filter out invalid timestamps
    const validTimestamps = timestamps.filter(ts => !isNaN(ts));

    if (validTimestamps.length < 2) return "0 min 0 sec"; // Not enough data to calculate time

    // Calculate the difference in milliseconds
    const startTime = Math.min(...validTimestamps); // First submission time
    const endTime = Math.max(...validTimestamps); // Last submission time
    const differenceInMilliseconds = endTime - startTime;

    // Convert to minutes and seconds
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Return formatted string
    return `${minutes} min ${seconds} sec`;
};

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Assuming getAdminScore() already returns parsed JSON data
                const result = await getAdminScore();

                console.log("API response", result);
                setData(result.data || result); // Adjust based on your API response structure
            } catch (error) {
                console.error("Error fetching admin scores:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
            fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-red-500 text-xl">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
            <p className="font-bold text-3xl text-white mb-8">Admin Panel</p>

            {data.length > 0 ? (
                data.map((item, index) => (
                    <ScoreCard
                        key={index}
                        teamName={item.teamName}
                        score={item.totalScore}
                        timeTaken={convertMillisecondsToTime(item.timeStamps)}
                        codeAnswers={item.code}
                        timeStamps={item.timeStamps}
                    />
                ))
            ) : (
                <p className="text-white text-xl">No data available</p>
            )}
        </div>
    );
};

export default AdminPage;