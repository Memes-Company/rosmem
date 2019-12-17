import React from 'react';
import { ButtonProps, ClassName } from 'src/types';
import { useClassName } from 'src/hooks';
import './button.pure.css'; 

export const Button: React.FC<React.PropsWithChildren<ClassName<ButtonProps>>> = ({onClick, children, className}) => {
  const parentClassName = useClassName(className);
  return (
    <button onClick={onClick} className={"button" + parentClassName}>{children}</button>
  )
}