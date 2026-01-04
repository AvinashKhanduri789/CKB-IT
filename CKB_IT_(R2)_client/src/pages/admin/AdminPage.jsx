import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { logout, getAdminScore } from '../../utils/requester';
import { createQuestion, updateQuestion, deleteQuestion, getQuestions } from '../../utils/requester';
import ScoreCard from '../../components/UserScore';
import ManageQuestions from '../../components/ManageQuestions'; // New component for managing questions

const convertMillisecondsToTime = (timeStamps) => {
    if (!timeStamps) return "0 min 0 sec";

    const timestamps = [
        timeStamps.question1 ? new Date(timeStamps.question1).getTime() : NaN,
        timeStamps.question2 ? new Date(timeStamps.question2).getTime() : NaN,
        timeStamps.question3 ? new Date(timeStamps.question3).getTime() : NaN
    ];

    const validTimestamps = timestamps.filter(ts => !isNaN(ts));

    if (validTimestamps.length < 2) return "0 min 0 sec";

    const startTime = Math.min(...validTimestamps);
    const endTime = Math.max(...validTimestamps);
    const differenceInMilliseconds = endTime - startTime;

    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} sec`;
};

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showManageQuestions, setShowManageQuestions] = useState(false); 
    const navigate = useNavigate();

    
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    
    const toggleManageQuestions = () => {
        setShowManageQuestions(!showManageQuestions);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getAdminScore();
                console.log("API response", result);
                setData(result.data || result);
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
        <div className="min-h-screen bg-gray-900">
            {/* Header with title and buttons */}
            <div className="flex justify-between items-center px-8 py-6">
                <p className="font-bold text-3xl text-white">Admin Panel</p>
                <div className="flex gap-4">
                    <button
                        onClick={toggleManageQuestions}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                    >
                        {showManageQuestions ? 'Back to Dashboard' : 'Manage Questions'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Conditional Rendering */}
            {showManageQuestions ? (
                <ManageQuestions onBack={toggleManageQuestions} />
            ) : (
                /* Original Content - Dashboard */
                <div className="flex flex-col items-center py-8">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <ScoreCard
                                key={index}
                                teamName={item.teamName}
                                score={item.totalScore}
                                timeTaken={convertMillisecondsToTime(item.timeStamps)}
                                codeAnswers={item.code}
                                timeStamps={item.timeStamps}
                                testCaseResults={item.testCaseResults }
                            />
                        ))
                    ) : (
                        <p className="text-white text-xl">No data available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage