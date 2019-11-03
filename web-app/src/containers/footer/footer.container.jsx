import React from 'react';
import './footer.container.css';

export const Footer = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="footer" style={{backgroundColor: "rgba(66, 66, 66, 0)"}}>
      <span className="footer-content">Footer Content...</span>
    </div>
  )
})