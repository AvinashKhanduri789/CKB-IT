import React, { useState, useRef } from 'react';

const Dropdown = ({currentLanguage, setCurrentLanguage}) => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
 

  // Ref to track clicks outside of the dropdown to close it
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Event listener for closing the dropdown when clicking outside
  React.useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} style={{zIndex:"40"}}>
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-gray-100 text-black px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
        style={{padding:"1rem"}}
      >
    <span className=' text-gray-900 font-bold'>Selected language :</span> {currentLanguage}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentLanguage("c") }
              >
                C '10.2.0'
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentLanguage("cpp")}
              >
                C++ '10.2.0'
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentLanguage("java")}
              >
                Java '15.0.2'
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentLanguage("javascript")}
              >
                Java script '18.15.0'
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setCurrentLanguage("python")}
              >
                Python 
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
