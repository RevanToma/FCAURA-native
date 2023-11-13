import axios from "axios";
import { auth } from "../firebase/firebase.auth";
import { User as FirebaseUser } from "@firebase/auth";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateEmail,
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { ProfileData } from "../screens/SetupProfile";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase.auth";
import { Alert } from "react-native";
import { User } from "../types";

type Auth = {
  mode?: "signUp" | "signInWithPassword";
  email: string;
  password: string;
};

export const authenticate = async ({ mode, email, password }: Auth) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    // const token = response.data.idToken;
    const uid = response.data.localId;
    const user = await fetchUserFromFirebase(uid);

    return { uid, user: { ...user, email: response.data.email } };
  } catch (error: any) {
    throw new Error(error.response?.data.error.message || "UNKNOWN_ERROR");
  }
};

export const createUser = (email: string, password: string) => {
  return authenticate({ mode: "signUp", email, password });
};

export function logIn(email: string, password: string) {
  return authenticate({ mode: "signInWithPassword", email, password });
}
// export const sendVerificationEmail = async () => {
//   const user = auth.currentUser;

//   if (user) {
//     try {
//       await sendEmailVerification(user); // This sends a verification email to the user
//       console.log("Verification email sent.");
//     } catch (error: any) {
//       console.error("Error sending verification email: ", error);
//       throw new Error(error.message);
//     }
//   } else {
//     throw new Error("User is not signed in.");
//   }
// };

export const signUpWithEmail = async (email: string, password: string) => {
  if (!email || !password) return;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(user);

    return createUserDocumentFromAuth(user);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  if (!email || !password) return;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return await createUserDocumentFromAuth(user);
  } catch (error: any) {
    throw new Error(error);
  }
};

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

type ReAuthenticate = {
  user: FirebaseUser;
  password: string;
  newEmail: string;
};

export const reAuthenticateUser = async ({
  user,
  password,
  newEmail,
}: ReAuthenticate) => {
  if (!user || !user.email) {
    throw new Error("Nop user is signed in");
  }
  const credential = EmailAuthProvider.credential(user.email, password);

  try {
    await reauthenticateWithCredential(user, credential);
    await updateFirebaseUserEmail(newEmail);
  } catch (error) {
    console.error("Reauthentication failed: ", error);
    throw error;
  }
};

export const updateFirebaseUserEmail = async (newEmail: string) => {
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
      if (error.code === "auth/requires-recent-login") {
        throw new Error(error.message);
      }
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
      role: "User",
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

export const updateUserPassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword);
      console.log("Password changed successfully");
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const updateUserProfileFirebase = async (
  uid: string,
  profileData: ProfileData
) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await updateDoc(userDocRef, profileData);
  } catch (error: any) {
    console.log("Error updating profile", error);
    throw new Error(error.message);
  }
};

export const fetchApprovedTeamMembers = async () => {
  try {
    const q = query(
      collection(db, "users"),
      where("teamMemberStatus", "==", "Approved")
    );
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((doc) => doc.data());
  } catch (error: any) {
    console.log("Error fetching approved team members", error);
    throw new Error(error.message);
  }
};

export const fetchMemberApplicants = async () => {
  try {
    const q = query(collection(db, "users"), where("teamMember", "==", true));
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((doc) => doc.data());
  } catch (error: any) {
    console.log("Error fetching approved team members", error);
    throw new Error(error.message);
  }
};

export const rejectOrApproveApplicants = async (
  uid: string,
  status: string
) => {
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, {
      teamMemberStatus: status,
    });
  } catch (error: any) {
    console.error("Error updating document: ", error);
  }
};

export const sendMessage = async (
  text: string,
  senderId: string,
  photoURL: string
) => {
  try {
    await addDoc(collection(db, "messages"), {
      text,
      senderId,
      timestamp: serverTimestamp(),
      photoURL: photoURL,
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};
