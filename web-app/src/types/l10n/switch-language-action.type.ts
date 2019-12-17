import { 
  Action,
  SwitchLanguagePayload
} from 'src/types';
import { L10N_SWITCH_LANGUAGE } from 'src/store/action-types';

export type SwitchLanguageAction = Action<typeof L10N_SWITCH_LANGUAGE, SwitchLanguagePayload>