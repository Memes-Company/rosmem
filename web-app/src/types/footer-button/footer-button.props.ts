import { ButtonProps } from 'src/types';

export type FooterButtonProps = {
  isActive?: boolean;
  display?: "inline" | "block";
} & ButtonProps;