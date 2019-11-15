import React from 'react';
import { BaseProps } from '../../types';
import './body.container.css';

export const Body = (props: BaseProps) => {
  console.log('body\'s props:', props);
  return (
    <div className={"body" + (props.class ? " " + props.class : "")}>
      <span className="body-title">Body</span>
    </div>
  )
}