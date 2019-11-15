import React from 'react';
import { BaseProps } from '../../types';
import './footer-title.component.css';

export const FooterTitle = React.forwardRef((props: BaseProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="footer-title" style={{backgroundColor: "rgba(66, 66, 66, 0)"}}>
      Footer Title
    </div>
  )
});