import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.auth";

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
