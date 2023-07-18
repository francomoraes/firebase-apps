import React from 'react';

const CloseButton = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col justify-around w-10 h-full bg-gray-200 cursor-pointer p-1 z-10 rounded ml-4 text-4xl font-bold"
        >
            X
        </div>
    );
};

export default CloseButton;
