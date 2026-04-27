import { getAdmins } from "../../../utils/requester";
import { useState } from "react";

const Login = ({ setLogged, setPageMode }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  function formError() {
    const elements = document.querySelectorAll(".login-input");
    const errClass = "login-err";

    elements.forEach((element) => {
      element.classList.add(errClass);
      setTimeout(function () {
        element.classList.remove(errClass);
      }, 1000);
    });
  }

  function formSuccess() {
    setLogged(true);
    setPageMode(1);
  }

  async function formSubmission() {
    if (!name.trim() || !password.trim()) {
      formError();
      return;
    }

    setIsLoading(true);
    try {
      const loginPassed = await getAdmins({
        name: name,
        password: password,
      });
      if (loginPassed) formSuccess();
    } catch (err) {
      formError();
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      formSubmission();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-8 pt-8 pb-4">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Admin Access
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Secure system authentication
            </p>
          </div>

          {/* Form Body */}
          <div className="px-8 pt-6 pb-8">
            {/* Username Field */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                className="login-input w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={changeName}
                onKeyPress={handleKeyPress}
                autoComplete="off"
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="login-input w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={changePassword}
                onKeyPress={handleKeyPress}
                autoComplete="off"
              />
            </div>

            {/* Login Button */}
            <button
              className={`w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={formSubmission}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-8 py-4 bg-gray-50">
            <p className="text-center text-xs text-gray-500">
              &copy; 2024 IT-UTSAV 2024 (USCS)
            </p>
          </div>
        </div>
      </div>

      {/* Global styles for error animation */}
      <style jsx>{`
        .login-err {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;