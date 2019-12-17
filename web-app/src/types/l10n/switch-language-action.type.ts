import { 
  Action,
  SwitchLanguagePayload
} from '../../types';
import { L10N_SWITCH_LANGUAGE } from '../../store/action-types';

export type SwitchLanguageAction = Action<typeof L10N_SWITCH_LANGUAGE, SwitchLanguagePayload>