import {ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className ,width = "w-full" , ...reset}: IProps) => {
  return (
    <button
      className={`${className} rounded-md ${width} text-white text-center w-full p-2`} {...reset}
    >
      {children}
    </button>
  );
};
export default Button;
