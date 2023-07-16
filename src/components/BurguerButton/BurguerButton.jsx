import React from 'react';

const BurguerButton = () => {
    return (
        <div className=" flex flex-col justify-around w-8 h-8 bg-gray-200 cursor-pointer p-1 z-10 rounded">
            <div className="w-6 h-1 relative bg-gray-700 rounded"></div>
            <div className="w-6 h-1 relative bg-gray-700 rounded"></div>
            <div className="w-6 h-1 relative bg-gray-700 rounded"></div>
        </div>
    );
};

export default BurguerButton;
