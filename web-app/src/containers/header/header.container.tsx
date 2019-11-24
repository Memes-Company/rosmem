import React from 'react';
import { BaseProps } from '../../types';
import './header.container.css';

export const Header = (props: BaseProps) => {
  return (
    <div className={"header" + (props.class ? " " + props.class : "")}>
      <input type="text" placeholder="Header?" />
    </div>
  )
}