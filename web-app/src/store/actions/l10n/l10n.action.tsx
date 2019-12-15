import { SwitchLanguage } from '../../../types';

export const L10N_SWITCH_LANGUAGE = "L10N_SWITCH_LANGUAGE";

export const switchLanguage: SwitchLanguage = (language) => ({
  type: L10N_SWITCH_LANGUAGE,
  payload: {
    language
  }
});