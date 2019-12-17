import {
  L10nState,
  L10nActions,
} from 'src/types';
import { L10N_SWITCH_LANGUAGE } from 'src/store/action-types';

const l10nInitialState: L10nState = {
  language: "en"
} 

export const l10nReducer = (state = l10nInitialState, {type, payload}: L10nActions) => {
  switch (type) {
    case L10N_SWITCH_LANGUAGE: 
      return {
        ...state,
        language: payload.language
      }
    default:
      return state;
  }
}