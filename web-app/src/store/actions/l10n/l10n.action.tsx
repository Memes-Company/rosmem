import { SwitchLanguage } from '../../../types';
import { L10N_SWITCH_LANGUAGE } from '../../../store/action-types';

export const switchLanguage: SwitchLanguage = (language) => ({
  type: L10N_SWITCH_LANGUAGE,
  payload: {
    language
  }
});