import React from 'react';
import { ClassName } from '../../types';
import './body.container.css';

export const Body: React.FC<ClassName<{}>> = ({className}) => {
  return (
    <div className={"body" + (className ? " " + className : "")}>
      Body
    </div>
  )
}