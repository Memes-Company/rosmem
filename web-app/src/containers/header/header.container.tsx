import React from 'react';
import { ClassName } from '../../types';
import './header.container.css';

export const Header: React.FC<ClassName<{}>> = ({className}) => {
  return (
    <div className={"header" + (className ? " " + className : "")}>
      <input type="text" placeholder="Header?" />
    </div>
  )
}