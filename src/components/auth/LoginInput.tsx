import React from 'react';

interface LoginInputProps {
  id: string;
  type: 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function LoginInput({
  id,
  type,
  value,
  onChange,
  placeholder,
  required = true
}: LoginInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 capitalize">
        {type}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border 
          border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
          focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}