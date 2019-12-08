import React from 'react';
import { FooterSection, FooterLink } from '../../components';
import './footer-body.component.css';

export const FooterBody = React.forwardRef<HTMLDivElement ,{}>((props, ref) => {
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
        <FooterLink display="inline" url="#">English</FooterLink>
        <FooterLink display="inline" url="#">Russian</FooterLink>
      </FooterSection>
    </div>
  )
});