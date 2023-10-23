export type NotAuthenticatedStackParamList = {
  Home: undefined;
  "Team Members": undefined;
  "Sign In": undefined;
  SetupNavigator: { screen?: keyof SetupStackParamList };
};

export type SetupStackParamList = {
  SetupProfile: undefined;
};

export type SignedInStackParamList = {
  Home: undefined;
  TeamMembers: undefined;
  Chat: undefined;
  Settings: undefined;
  SetupNavigator: { screen?: keyof SetupStackParamList }; // This allows you to optionally specify a screen in the SetupNavigator
};

export type MainStackParamList = {
  NotAuthenticated: undefined;
  SetupNavigator: undefined;
  SignedInNavigator: undefined;
};
