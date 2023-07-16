import React from 'react';

const LoginButton = ({ children, onClick }) => {
    return (
        <button
            className="text-gray-100 bg-gray-700 rounded-md p-2 my-2"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default LoginButton;
