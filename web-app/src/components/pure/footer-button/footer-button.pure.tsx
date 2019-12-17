import React, { useContext } from 'react';
import { FooterTheme, FooterButtonProps, ButtonProps } from 'src/types';
import { Button } from 'src/components/pure';
import { FooterThemeContext } from 'src/contexts';
import './footer-button.pure.css';
import { useClassName } from 'src/hooks';

const footerButtonTheme = {
  light: "footer-button_light",
  dark: "footer-button_dark"
}

const footerButtonDisplay = {
  block: "footer-button_block",
  inline: "footer-button_inline"
}

export const FooterButton: React.FC<React.PropsWithChildren<FooterButtonProps>> = ({isActive = false, onClick, display = "block", children}) => {
  const footerTheme: FooterTheme = useContext(FooterThemeContext);
  const buttonTheme = useClassName(footerButtonTheme[footerTheme]);
  const buttonDisplay = useClassName(footerButtonDisplay[display]);
  const buttonState = useClassName(isActive ? "footer-button_active" : "");
  const buttonProps: ButtonProps = {
    onClick
  }

  return (
    <Button {...buttonProps} className={"footer-button" + buttonTheme + buttonDisplay + buttonState}>{children}</Button>
  )
}