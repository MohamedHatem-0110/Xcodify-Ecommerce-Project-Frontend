import React, { useEffect } from 'react';

const TextInput = ({
  name,
  label,
  value,
  onChange,
  isFieldEmpty,
  password,
}) => {
  let classNames =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-700';

  if (isFieldEmpty) {
    classNames =
      'w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:border-red-700';
  } else {
    classNames =
      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-700';
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <input
        type={password ? 'password' : 'text'}
        id={name}
        name={name}
        value={value}
        className={classNames}
        onChange={onChange}
      />
      {isFieldEmpty && (
        <p className="text-red-500 text-xs italic">Please Fill in this Field</p>
      )}
    </div>
  );
};

export default TextInput;
