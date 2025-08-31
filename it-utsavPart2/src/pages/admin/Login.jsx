import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just log the username and password
        console.log('Username:', username);
        console.log('Password:', password);
        // Reset form after submission

        if(username==="admin-ckb" && password==="ckb@codex-club"){
            setUsername('');
            setPassword('');
            navigate("/admin");

        }else{
            alert("wrong username or password");
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-200 " style={{padding:"3rem"}}>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-10" style={{margin:"1rem"}}>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                            style={{padding:"1rem"}}
                        />
                    </div>
                    <div className="mb-6" style={{margin:"1rem"}}>
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                            style={{padding:"1rem"}}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        style={{padding:"1rem", marginTop:"1rem"}}
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default LoginForm;
