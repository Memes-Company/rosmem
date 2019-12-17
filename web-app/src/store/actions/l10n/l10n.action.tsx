import { SwitchLanguage } from 'src/types';
import { L10N_SWITCH_LANGUAGE } from 'src/store/action-types';

export const switchLanguage: SwitchLanguage = (language) => ({
  type: L10N_SWITCH_LANGUAGE,
  payload: {
    language
  }
});