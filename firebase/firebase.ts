import { AppRegistry } from "react-native";
import App from "../App";
import { AuthContext } from "../store/authContext";
import { useContext } from "react";
import { ProfileData } from "../screens/SetupProfile";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

export const saveToFirebase = async (
  userId: string,
  profileData: ProfileData
) => {
  if (!userId) return; // handle error

  const usersCollection = collection(db, "users");
  const q = query(usersCollection); // Add any constraints if needed

  const querySnapshot = await getDocs(q);

  try {
    const randomDocId = querySnapshot.docs[0].id; // Assuming there's only one document with a random ID
    const userRef = doc(db, "users", randomDocId);

    const userObject = {
      id: Date.now(),
      ...profileData,
    };

    await updateDoc(userRef, { users: arrayUnion(userObject) });
  } catch (error: any) {
    console.log(error);
  }
};
