import React, { useContext } from 'react';
import { FooterThemeContext } from '../../contexts';
import { Link } from '../../components';
import './footer-creators.component.css';

const footerCreatorsTheme = {
  light: "footer-creators_light",
  dark: "footer-creators_dark"
}

export const FooterCreators: React.FC<{}> = () => {
  const footerTheme = useContext(FooterThemeContext);
  const textTheme = footerCreatorsTheme[footerTheme];

  return (
    <div className={`footer-creators ${textTheme}`}>
      Created by <Link url={"#"}>pupa</Link> and <Link url={"#"}>lupa</Link>
    </div>
  )
}