import { combineReducers } from 'redux';
import { AppState } from '../../../types';
import { l10nReducer } from '../../../store/reducers';

export const appReducer = combineReducers<AppState>({
  l10n: l10nReducer
});