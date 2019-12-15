import { ButtonProps } from '../../types';

export type FooterButtonProps = {
  isActive?: boolean;
  display?: "inline" | "block";
} & ButtonProps;