import {
  getFirestore,
  doc,
  query,
  collection,
  getDocs,
  onSnapshot,
  Timestamp,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { app } from "../config/firebase";

export const db = getFirestore(app);
export const storage = getStorage(app);

export const getEventsRealTime = snapshot => onSnapshot(collection(db, "events"), snapshot);

export const addDocumentToCollection = async ({ collectionRef, document }) => {
  await addDoc(collection(db, collectionRef), document);
};
export const updateDocument = async ({ collectionRef, document }) => {
  await updateDoc(doc(db, collectionRef, document.id), { ...document, updated: serverTimestamp() });
};
export const deleteDocument = async ({ collectionRef, docId }) => {
  await deleteDoc(doc(db, collectionRef, docId));
};
