export type LanguageCode = 'en' | 'hi';

export type StateNodeID = 
  | 'start' 
  | 'age_check' 
  | 'underage' 
  | 'state_check' 
  | 'registered_check' 
  | 'voter_id_issues' 
  | 'registration_guide' 
  | 'polling_booth' 
  | 'election_timeline' 
  | 'end'
  | 'non_citizen'
  | 'lost_card_info'
  | 'corrections_info';

export interface MessageOption {
  label: string;
  nextState?: StateNodeID;
  value?: string;
  action?: string;
}

export interface StateNode {
  text: string;
  options?: MessageOption[];
  inputType?: 'text';
  inputPlaceholder?: string;
  nextState?: StateNodeID;
  showMapMockup?: boolean;
}

export interface ChatMessage extends Partial<StateNode> {
  id: string;
  stateId?: StateNodeID;
  sender: 'bot' | 'user';
  text: string;
}

export interface UserSessionData {
  ageGroup: string | null;
  state: string | null;
  isRegistered: boolean | null;
  voterIdStatus: string | null;
  lastStep?: StateNodeID;
}
