import React from 'react';
import './body.container.css';

export const Body = (props) => {
  console.log('body\'s props:', props);
  return (
    <div className={`body ${props.class}`}>
      <span className="body-title">body</span>
    </div>
  )
}