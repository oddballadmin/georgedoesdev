
import React from "react";
import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
  name:string;
  position: "left" | "right";

}

export const SliderButton = ({children,name,position,...props}: ButtonProps) => {
  return (
    <>
      <button {...props}>
        {children}
      </button>
    </>
  );
}