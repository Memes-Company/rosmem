import React from 'react';
import { ClassName } from '../../types';
import { useParentClassName } from '../../hooks';
import './header.container.css';

export const Header: React.FC<ClassName<{}>> = ({className}) => {
  const parentClassName = useParentClassName(className);

  return (
    <div className={"header" + parentClassName}>
      <input type="text" placeholder="Header?" />
    </div>
  )
}