import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="px-4 py-2 bg-blue-600 text-white rounded"
  >
    {children}
  </button>
);
