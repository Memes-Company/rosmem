import React, { useContext } from 'react';
import { ClassName } from 'src/types';
import { useClassName } from 'src/hooks';
import { FooterThemeContext } from 'src/contexts';
import { FooterSectionProps, FooterTheme } from 'src/types';
import './footer-section.pure.css';

const footerSectionTheme = {
  light: "footer-section__title_light", 
  dark: "footer-section__title_dark"
}

export const FooterSection: React.FC<React.PropsWithChildren<ClassName<FooterSectionProps>>> = ({className, title, children}) => {
  const parentClassName = useClassName(className);
  const footerTheme: FooterTheme = useContext(FooterThemeContext);
  const titleTheme = footerSectionTheme[footerTheme];

  return (
    <div className={`footer-section ${parentClassName}`}>
      <div className={`footer-section__title ${titleTheme}`}>
        {title}
      </div>
      <div className="footer-section__content">
        {children}
      </div>
    </div>
  )
}