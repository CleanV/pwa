import React, { useState, useEffect, useRef } from 'react';

function DropdownMenu ({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        &emsp;&emsp;&emsp;&emsp;&emsp;
        {isOpen ? <i className="fa-solid fa-ellipsis-vertical"></i> : <i className="fa-solid fa-ellipsis-vertical"></i>}
        &emsp;
      </button>
      {isOpen && (
            <ul className="absolute divide-y divide-gray-100 rounded-lg shadow bg-gray-700 py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {options.map((option) => (
                <li key={option}>
                    <a key={option} onClick={() => handleSelect(option)} href="#" className="block px-4 py-1 hover:bg-gray-100">{option}</a>
                </li>
            ))}
            </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
