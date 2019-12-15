import { combineReducers } from 'redux';
import { l10nReducer } from '../../reducers';

export const appReducer = combineReducers({
  l10n: l10nReducer
});