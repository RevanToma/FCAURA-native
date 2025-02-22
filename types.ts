import { DocumentData } from "firebase/firestore";
import { IMessage } from "react-native-gifted-chat";
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
  SetupNavigator: { screen?: keyof SetupStackParamList }; // This allows me to optionally specify a screen in the SetupNavigator
};

export type MainStackParamList = {
  NotAuthenticated: undefined;
  SetupNavigator: undefined;
  SignedInNavigator: undefined;
};

export type isTeamMemberStatus = "Pending" | "Approved" | "Rejected";

type userRoles = "Admin" | "User";

export type User = {
  name: string;
  bio: string;
  instagram: string;
  teamMemberStatus: "Pending" | "Approved" | "Rejected";
  teamMember: boolean;
  position: string;
  skills: string[];
  completedProfileSetup: boolean;
  role: userRoles;
  uid: null | string;
  email: string;
  photoURL: string;
  displayName?: string;
};

export type NotAuthenticatedNavigatorProps = {
  Home: undefined;
  SignIn: undefined;
  TeamMembers: undefined;
  Chat?: undefined;
  Settings?: undefined;
  Authenticate?: undefined;
};

export type FirebaseDocumentData = {
  DocumentData: DocumentData;
};

export type MyMessage = IMessage & {
  replyMessage?: {
    text: string;
    userName: string;
  };
};
