import { getFirestore, doc, query, collection, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { app } from "../config/firebase";

export const db = getFirestore(app);
export const storage = getStorage(app);

export const getEventsRealTime = snapshot => onSnapshot(collection(db, "events"), snapshot);
