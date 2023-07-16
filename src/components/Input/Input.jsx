import React from 'react';

const Input = (props) => {
    const { placeholder, onBlur, onChange, type } = props;

    return (
        <input
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            className="py-2 px-4 my-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            type={type}
        />
    );
};

export default Input;
