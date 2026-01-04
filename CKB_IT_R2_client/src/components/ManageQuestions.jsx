import React, { useState, useEffect } from 'react';
import { createQuestion, updateQuestion, deleteQuestion, getQuestions } from '../utils/requester';
import QuestionBox from './QuestionBox'; 

const ManageQuestions = ({ onBack }) => {
    const [questions, setQuestions] = useState([null, null, null]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await getQuestions();
            
            const fetchedQuestions = response.data || response;
            
            
            const questionsArray = [null, null, null];
            
            fetchedQuestions.forEach(question => {
                const index = fetchedQuestions.indexOf(question);
                if (index < 3) {
                    questionsArray[index] = question;
                }
            });
            
            setQuestions(questionsArray);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateQuestion = async (questionNumber, questionData) => {
        try {
            await createQuestion(questionData);
            fetchQuestions(); 
        } catch (error) {
            console.error("Error creating question:", error);
            throw error;
        }
    };

    const handleUpdateQuestion = async (questionId, questionData) => {
        try {
            console.log("handleUpateQuestion called --->", questionData)
            await updateQuestion(questionId, questionData);
            fetchQuestions(); 
        } catch (error) {
            console.error("Error updating question:", error);
            throw error;
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            await deleteQuestion(questionId);
            fetchQuestions(); 
        } catch (error) {
            console.error("Error deleting question:", error);
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-xl">Loading questions...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Manage Questions</h1>
                
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                        Error: {error}
                    </div>
                )}

                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <QuestionBox
                            key={index}
                            questionNumber={index + 1}
                            question={question}
                            onCreate={handleCreateQuestion}
                            onUpdate={handleUpdateQuestion}
                            onDelete={handleDeleteQuestion}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onBack}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageQuestions;