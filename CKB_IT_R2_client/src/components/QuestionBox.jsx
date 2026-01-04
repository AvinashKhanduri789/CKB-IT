import React, { useState } from 'react';

const QuestionBox = ({ questionNumber, question, onCreate, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        text: question?.text || '',
        difficulty: question?.difficulty || 'easy',
        maxScore: question?.maxScore || 30,
        testCases: question?.testCases || [{ input: '', expectedOutput: '', isPublic: true }]
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'maxScore' ? parseInt(value) || 0 : value
        }));
    };

    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = [...formData.testCases];
        updatedTestCases[index][field] = field === 'isPublic' ? value === 'true' : value;
        setFormData(prev => ({ ...prev, testCases: updatedTestCases }));
    };

    const addTestCase = () => {
        setFormData(prev => ({
            ...prev,
            testCases: [...prev.testCases, { input: '', expectedOutput: '', isPublic: false }]
        }));
    };

    const removeTestCase = (index) => {
        if (formData.testCases.length > 1) {
            const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, testCases: updatedTestCases }));
        }
    };

    const validateForm = () => {
        if (!formData.text.trim()) {
            return 'Question text is required';
        }
        if (formData.maxScore <= 0) {
            return 'Max score must be greater than 0';
        }
        for (const testCase of formData.testCases) {
            if (!testCase.input.trim() || !testCase.expectedOutput.trim()) {
                return 'All test cases must have both input and expected output';
            }
        }
        return '';
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');

        try {
            if (question) {
                // Update existing question
                await onUpdate(question._id, formData);
            } else {
                // Create new question
                await onCreate(questionNumber, formData);
            }
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await onDelete(question._id);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
            }
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Question {questionNumber}</h2>
                <div className="flex gap-2">
                    {question ? (
                        <>
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                text: question.text,
                                                difficulty: question.difficulty,
                                                maxScore: question.maxScore,
                                                testCases: question.testCases
                                            });
                                            setError('');
                                        }}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                                >
                                    Create
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Create Question
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                text: '',
                                                difficulty: 'easy',
                                                maxScore: 30,
                                                testCases: [{ input: '', expectedOutput: '', isPublic: true }]
                                            });
                                            setError('');
                                        }}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            {(!question || isEditing) ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Question Text</label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                            rows="3"
                            placeholder="Enter question description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 mb-2">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Max Score</label>
                            <input
                                type="number"
                                name="maxScore"
                                value={formData.maxScore}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                min="1"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-300">Test Cases</label>
                            <button
                                type="button"
                                onClick={addTestCase}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                            >
                                Add Test Case
                            </button>
                        </div>
                        {formData.testCases.map((testCase, index) => (
                            <div key={index} className="bg-gray-900 p-4 rounded mb-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-300 font-medium">Test Case {index + 1}</span>
                                    {formData.testCases.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTestCase(index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Input</label>
                                        <textarea
                                            value={testCase.input}
                                            onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
                                            rows="2"
                                            placeholder="Test case input..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Expected Output</label>
                                        <textarea
                                            value={testCase.expectedOutput}
                                            onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                            className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
                                            rows="2"
                                            placeholder="Expected output..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                        <span className="text-gray-400 text-sm mr-3">Visibility:</span>
                                        <select
                                            value={testCase.isPublic.toString()}
                                            onChange={(e) => handleTestCaseChange(index, 'isPublic', e.target.value)}
                                            className="bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
                                        >
                                            <option value="true">Public (visible to users)</option>
                                            <option value="false">Private (hidden from users)</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-gray-300 space-y-3">
                    <p><strong>Text:</strong> {question.text}</p>
                    <p><strong>Difficulty:</strong> <span className="capitalize">{question.difficulty}</span></p>
                    <p><strong>Max Score:</strong> {question.maxScore}</p>
                    <p><strong>Test Cases:</strong> {question.testCases?.length || 0}</p>
                   
                </div>
            )}
        </div>
    );
};

export default QuestionBox;

