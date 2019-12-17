import React from 'react';
import { ClassName } from 'src/types';
import { useClassName } from 'src/hooks';
import './header.stateful.css';

export const Header: React.FC<ClassName<{}>> = ({className}) => {
  const parentClassName = useClassName(className);

  return (
    <div className={"header" + parentClassName}>
      <input type="text" placeholder="Header?" />
    </div>
  )
}