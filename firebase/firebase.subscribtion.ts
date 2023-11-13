import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.auth";
import { IMessage } from "react-native-gifted-chat";

export const subscribeToTeamMembers = (
  callback: (members: DocumentData[]) => void
) => {
  const q = query(
    collection(db, "users"),
    where("teamMemberStatus", "==", "Approved")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const members: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      members.push({ uid: doc.id, ...doc.data() });
    });
    callback(members);
  });

  return unsubscribe;
};

export const subscribeToApplicants = (
  callback: (applicants: DocumentData[]) => void
) => {
  const q = query(
    collection(db, "users"),
    where("teamMemberStatus", "in", ["Approved", "Rejected"])
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newApplicants: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      newApplicants.push({ uid: doc.id, ...doc.data() });
    });
    callback(newApplicants);
  });
  return unsubscribe;
};

// export const subscribeToMessages = (
//   callback: (messages: DocumentData[]) => void
// ) => {
//   const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const messages: DocumentData[] = [];

//     querySnapshot.forEach((doc) => {
//       messages.push({ id: doc.id, ...doc.data() });
//     });
//     callback(messages);
//   });
//   return unsubscribe;
// };
export const subscribeToMessages = (
  callback: (messages: IMessage[]) => void
) => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      _id: doc.id,
      text: doc.data().text,
      createdAt: doc.data().timestamp
        ? doc.data().timestamp.toDate()
        : new Date(),
      user: {
        _id: doc.data().senderId,
        avatar: doc.data().photoURL,
      },
    }));
    callback(messages);
  });
  return unsubscribe;
};
