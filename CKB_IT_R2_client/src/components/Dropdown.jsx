import React, { useState, useRef, useEffect } from "react";
import { FaJava, FaPython, FaJsSquare } from "react-icons/fa";
import { SiC, SiCplusplus } from "react-icons/si";

const Dropdown = ({ currentLanguage, setCurrentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  // Language options
  const languages = [
    { id: "c", label: "C 10.2.0", icon: <SiC className="text-blue-600" /> },
    { id: "cpp", label: "C++ 10.2.0", icon: <SiCplusplus className="text-indigo-600" /> },
    { id: "java", label: "Java 15.0.2", icon: <FaJava className="text-red-600" /> },
    { id: "javascript", label: "JavaScript 18.15.0", icon: <FaJsSquare className="text-yellow-500" /> },
    { id: "python", label: "Python 3.10.0", icon: <FaPython className="text-green-500" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef} style={{ zIndex: 40 }}>
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}

        className="flex items-center justify-between w-60 bg-white/10 text-white px-4 py-3 rounded-xl border border-gray-500 backdrop-blur-md shadow-lg font-semibold hover:bg-white/20 transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          {languages.find((lang) => lang.id === currentLanguage)?.icon}
          {languages.find((lang) => lang.id === currentLanguage)?.label}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{backgroundColor:"#111827E6"}}
          className="absolute mt-2 w-60  text-black rounded-xl shadow-2xl border border-gray-300 backdrop-blur-md overflow-hidden animate-fadeScale"
        >
          <ul className="divide-y divide-gray-200">
            {languages.map((lang) => (
              <li
                key={lang.id}
                onClick={() => {
                  setCurrentLanguage(lang.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-300 ${
                  currentLanguage === lang.id
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-green-700"
                }`}
              >
                {lang.icon}
                {lang.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeScale {
          animation: fadeScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
