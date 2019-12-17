import React, { useContext } from 'react';
import { FooterTheme, LinkProps } from '../../../types';
import { FooterThemeContext } from '../../../contexts';
import { FooterLinkProps } from '../../../types';
import { Link } from '../../../components/pure';
import { ReactComponent as LinkOutSVG } from '../../../assets/svg/link-out.svg';
import './footer-link.pure.css';

const footerLinkTheme = {
  light: {
    link: "footer-link_light",
    svg: "footer-link__svg_light"
  },
  dark: {
    link: "footer-link_dark",
    svg: "footer-link__svg_dark"
  }
}

const footerLinkDisplay = {
  block: "footer-link_block",
  inline: "footer-link_inline"
}

export const FooterLink: React.FC<React.PropsWithChildren<FooterLinkProps>> = ({display = "block", onClick, url, external = false, children}) => {
  const footerTheme: FooterTheme = useContext(FooterThemeContext);
  const {link: linkTheme, svg: svgTheme} = footerLinkTheme[footerTheme];
  const linkDisplay = footerLinkDisplay[display];
  const linkProps: LinkProps = {
    onClick,
    url
  }
  
  return (
    <Link {...linkProps} className={`footer-link ${linkTheme} ${linkDisplay}`}>
      {children}
      {external ? <LinkOutSVG className={`footer-link__svg ${svgTheme}`} /> : null}
    </Link>
  )
}