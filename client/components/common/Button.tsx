import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  inverted?: boolean;
  size?: 'small' | 'large';
}

export const Button: React.FC<ButtonProps> = ({ text, size, inverted, ...props }) => {
  return (
    <button
      className={`rounded-full font-bold text-white py-1 mx-1
      ${size === 'small' ? 'px-2' : 'px-7'} 
      ${
        inverted
          ? 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
          : 'bg-blue-600 hover:bg-blue-500'
      }
      `}
      {...props}
    >
      {text}
    </button>
  );
};
