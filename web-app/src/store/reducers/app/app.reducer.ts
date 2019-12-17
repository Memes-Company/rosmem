import { combineReducers } from 'redux';
import { AppState } from 'src/types';
import { l10nReducer } from 'src/store/reducers';

export const appReducer = combineReducers<AppState>({
  l10n: l10nReducer
});