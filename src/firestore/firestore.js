import { getFirestore, doc, query, collection, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { app } from "../config/firebase";

export const db = getFirestore(app);

// export const getEventsRealTime = () =>
//   onSnapshot(
//     collection(db, "events"),
//     snapshot => {
//       const events = [];
//       snapshot.forEach(doc => {
//         const data = doc.data();
//         for (const prop in data) {
//           if (data[prop] instanceof Timestamp) {
//             data[prop] = data[prop].toDate().toISOString();
//           }
//         }
//         events.push({ ...data, id: doc.id });
//         console.log(events);
//         return events;
//       });
//       //   console.log(events);
//     },
//     error => console.log(error)
//   );
export const getEventsRealTime = snapshot => onSnapshot(collection(db, "events"), snapshot);
