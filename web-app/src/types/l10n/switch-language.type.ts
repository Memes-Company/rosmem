import { SwitchLanguageAction } from '../../types';

export type SwitchLanguage  = {
  (language: string): SwitchLanguageAction;
}