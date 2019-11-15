import React from 'react';
import { BaseProps } from '../../types';
import './header.container.css';

export const Header = (props: BaseProps) => {
  return (
    <div className={"header" + (props.class ? " " + props.class : "")}>
      <span className="header-title">Header</span>
    </div>
  )
}