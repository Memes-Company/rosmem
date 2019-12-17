import { SwitchLanguageAction } from 'src/types';

export type SwitchLanguage  = {
  (language: string): SwitchLanguageAction;
}