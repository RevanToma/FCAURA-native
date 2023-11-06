import { AppRegistry } from "react-native";
import App from "../App";

import { ProfileData } from "../screens/SetupProfile";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
  profileData: ProfileData
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
