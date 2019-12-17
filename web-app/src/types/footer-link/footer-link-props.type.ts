import { LinkProps } from '../../types';

export type FooterLinkProps = {
  display?: "inline" | "block";
  external?: boolean;
} & LinkProps;