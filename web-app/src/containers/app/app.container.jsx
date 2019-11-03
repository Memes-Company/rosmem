import React, { useRef, useEffect } from 'react';
import { 
  Header, 
  Body, 
  Footer 
} from '../../containers';
import {
  FooterTitle
} from '../../components';
import './app.container.css';

export const App = () => {
  const footerTitleElement = useRef(null);
  const footerElement = useRef(null);

  useEffect(() => {
    const footerScrollListener = () => {
      const footerScrollHeight = window.innerHeight - footerElement.current.getBoundingClientRect().y;
      const matchRGB = new RegExp(/.+\((\d+)\,\s(\d+)\,\s(\d+).+/);
      const [fullMatch, red, green, blue] = footerElement.current.style.backgroundColor.match(matchRGB);

      if (footerScrollHeight >= 0) {
        const footerScrollInicator = footerScrollHeight / footerElement.current.clientHeight;
        
        [footerTitleElement, footerElement].forEach(el => {
          el.current.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${footerScrollInicator})`;
        });
      }
    }

    document.addEventListener('scroll', footerScrollListener);
    return () => {
      document.removeEventListener('scroll', footerScrollListener);
    }
  });

  return (
    <div className="app">
      <div className="preview">
        <Header />
        <Body class="preview__body" />
        <FooterTitle ref={footerTitleElement} />
      </div>
      <Footer ref={footerElement} />
    </div>
  )
}