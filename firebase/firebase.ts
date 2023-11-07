import { Alert, AppRegistry } from "react-native";
import App from "../App";
import { User as FirebaseUser } from "@firebase/auth";

import { ProfileData } from "../screens/SetupProfile";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  updateEmail,
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { User } from "../types";

import AsyncStorage from "@react-native-async-storage/async-storage";

// AppRegistry.registerComponent("FCAura", () => App);

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN!,
  databaseURL: process.env.EXPO_PUBLIC_DATABSE_URL!,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
console.log("USERAUTH", auth);
export const saveToFirebase = async (uid: string, profileData: ProfileData) => {
  try {
    const userRef = doc(collection(db, "users"), uid); // Use the UID as the document ID
    await setDoc(userRef, profileData); // Will create a new doc or overwrite an existing one with the same ID
    return uid;
  } catch (error: any) {
    console.error("Error saving document: ", error);
    return null;
  }
};

export const updateFirebaseUser = async (
  userId: string,
  profileData: Partial<ProfileData>
) => {
  const userRef = doc(db, "users", userId);

  try {
    // Update the existing document
    await updateDoc(userRef, profileData);
  } catch (error: any) {
    console.error("Error updating document: ", error);
    // Handle error appropriately.
  }
};

export const sendVerificationEmail = async (newEmail: string) => {
  // const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await updateEmail(user, newEmail); // This sets the new email, but requires verification
      await sendEmailVerification(user); // This sends a verification email to the user
      console.log("Verification email sent.");
    } catch (error: any) {
      console.error("Error sending verification email: ", error);
      throw new Error(error.message);
    }
  } else {
    throw new Error("User is not signed in.");
  }
};

export const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);

export const reAuthenticateUser = async (email: string, password: string) => {
  // const auth = getAuth();
  const user = auth.currentUser;

  // Create credentials
  const credentials = EmailAuthProvider.credential(email, password);

  if (user) {
    try {
      // Reauthenticate
      await reauthenticateWithCredential(user, credentials);
      console.log("User re-authenticated");
      // The user is re-authenticated and you can proceed with sensitive operations here
    } catch (error: any) {
      console.error("Error re-authenticating user: ", error);
      throw new Error(error.message);
    }
  }
};
export const updateFirebaseUserEmail = async (newEmail: string) => {
  // const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await verifyBeforeUpdateEmail(user, newEmail);
      Alert.alert(
        "Verify New Email",
        "A verification email has been sent to your new email address. Please verify it to complete the update process. Please do check your Bin aswell."
      );
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        email: newEmail,
      });
    } catch (error: any) {
      console.error("Error updating user email: ", error);
      throw new Error(error.message);
    }
  } else {
    console.log(Error);
    throw new Error("Unable to update email for the current user.");
  }
};

export const fetchUserFromFirebase = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid); // Use the UID to reference the document
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching document: ", error);
    return null;
  }
};

export const createUserDocumentFromAuth = async (userAuth: FirebaseUser) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const displayName = userAuth.displayName ?? "";

    const createdAt = Date();

    const newUser: Partial<User> = {
      email: userAuth.email ?? "",
      name: displayName,
      bio: "",
      instagram: "",
      teamMemberStatus: "Pending",
      teamMember: false,
      position: "",
      skills: [],
      completedProfileSetup: false,
      photoURL: userAuth.photoURL ?? "",
      uid: userAuth.uid,
    };

    try {
      await setDoc(userDocRef, {
        ...newUser,
        createdAt,
      });
      userSnapshot = await getDoc(userDocRef);
    } catch (error) {
      throw new Error();
    }
  }

  return { uid: userAuth.uid, ...userSnapshot.data() };
};
