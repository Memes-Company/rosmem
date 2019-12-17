import { LinkProps } from 'src/types';

export type FooterLinkProps = {
  display?: "inline" | "block";
  external?: boolean;
} & LinkProps;