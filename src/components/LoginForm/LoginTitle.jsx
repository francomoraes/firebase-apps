import React from 'react';

const LoginTitle = ({ children }) => {
    return (
        <h3 className="font-bold text-2xl text-gray-700 text-center my-2 uppercase">
            {children}
        </h3>
    );
};

export default LoginTitle;
