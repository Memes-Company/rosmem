import React from 'react';
import { ButtonProps, ClassName } from '../../types';
import { useClassName } from '../../hooks';
import './button.component.css'; 

export const Button: React.FC<React.PropsWithChildren<ClassName<ButtonProps>>> = ({onClick, children, className}) => {
  const parentClassName = useClassName(className);
  return (
    <button onClick={onClick} className={"button" + parentClassName}>{children}</button>
  )
}