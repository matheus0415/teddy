import { ReactNode, ButtonHTMLAttributes } from 'react';
type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: ({ children, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
