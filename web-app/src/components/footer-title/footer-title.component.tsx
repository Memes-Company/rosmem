import React, { useContext } from 'react';
import { FooterThemeContext } from '../../contexts';
import { FooterTheme } from '../../types'
import { ReactComponent as LogonameSVG } from '../../assets/svg/logoname.svg';
import './footer-title.component.css';

const footerTitleTheme = {
  light: "footer-title__logoname_light",
  dark: "footer-title__logoname_dark"
}

export const FooterTitle = () => {
  const footerTheme: FooterTheme = useContext(FooterThemeContext);
  const svgTheme = footerTitleTheme[footerTheme];
  return (
    <div className="footer-title">
      <LogonameSVG className={`footer-title__logoname ${svgTheme}`} />
    </div>
  )
}