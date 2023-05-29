import { Timestamp, addDoc, doc, arrayUnion, collection, updateDoc, increment } from "firebase/firestore";
import { db } from "./firestore";

export const addEvent = async ({ formdata, user }) => {
  const date = Timestamp.fromDate(formdata.date);
  const createdAt = Timestamp.fromDate(new Date());
  const attendees = arrayUnion({
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
  const attendeesId = arrayUnion(user.id);
  const event = {
    ...formdata,
    date: date,
    createdAt: createdAt,
    attendees: attendees,
    attendeesId: attendeesId,
    hostedBy: user.displayName,
    hostId: user.id,
    hostPhotoURL: user.photoURL || null,
  };

  try {
    await addDoc(collection(db, "events"), event);
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async ({ formdata, eventId, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to edit post that you did not create.");
  }
  const date = Timestamp.fromDate(formdata.date);
  try {
    await updateDoc(doc(db, "events", eventId), { ...formdata, date: date });
  } catch (error) {
    console.log(error);
  }
};
