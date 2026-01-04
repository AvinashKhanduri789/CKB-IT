import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/requester';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Username:", username);
            console.log("Password:", password);

            const res = await login(username, password);
            if (res.status == 200) {
                navigator("/admin");
            } else {
                alert(res.data?.message || "Authentication failed");
            }

        } catch (error) {
            console.error("Login error:", error);


            if (error.response) {

                alert(error.response.data?.message || "Authentication failed");
            } else if (error.request) {

                alert("Server not responding. Please try again later.");
            } else {

                alert(error.message || "Something went wrong");
            }
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div style={{ borderRadius: "10px", marginTop: "4rem", padding: "5rem" }} className="bg-white shadow-2xl w-full max-w-md">
                <div className="p-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h2>
                        <p className="text-gray-600 text-sm">Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-3" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter username"
                                className="mt-1 p-4 w-full border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                autoComplete="username"
                            />
                        </div>

                        <div className="mb-10">
                            <label className="block text-sm font-semibold text-gray-700 mb-3" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter password"
                                className="mt-1 p-4 w-full border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-400 text-xs">
                            Secure login | Protected admin area
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;