import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/types';
import { switchLanguage } from 'src/store/actions';
import { FooterSection, FooterLink, FooterButton } from 'src/components/pure';
import './footer-body.stateful.css';

export const FooterBody = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const language = useSelector((state: AppState): string => state.l10n.language);
  const dispatch = useDispatch();

  return (
    <div ref={ref} className="footer-body">
      <FooterSection title="Actions">
        <FooterLink url="#" external={true}>Log In</FooterLink>
        <FooterLink url="#" external={true}>Suggest Meme</FooterLink>
      </FooterSection>

      <FooterSection title="Information">
        <FooterLink url="#">About</FooterLink>
        <FooterLink url="#">Blog</FooterLink>
        <FooterLink url="#">Contact Us</FooterLink>
      </FooterSection>

      <FooterSection title="Language">
        <FooterButton isActive={language === "en"} onClick={() => dispatch(switchLanguage("en"))} display="inline">English</FooterButton>
        <FooterButton isActive={language === "ru"} onClick={() => dispatch(switchLanguage("ru"))} display="inline">Russian</FooterButton>
      </FooterSection>
    </div>
  )
});