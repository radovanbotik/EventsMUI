import {
  Timestamp,
  addDoc,
  doc,
  arrayUnion,
  collection,
  updateDoc,
  increment,
  deleteDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
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

export const deleteEvent = async ({ eventId, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to delete post that you did not create.");
  }
  try {
    await deleteDoc(doc(db, "events", eventId));
  } catch (error) {
    console.log(error);
  }
};

export const cancelEvent = async ({ eventId, cancelled, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to delete post that you did not create.");
  }
  try {
    await updateDoc(doc(db, "events", eventId), { cancelled: !cancelled });
  } catch (error) {
    console.log(error);
  }
};

export const joinEvent = async ({ eventId, user }) => {
  const attendee = {
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
  const attendees = arrayUnion(attendee);
  const attendeesId = arrayUnion(attendee.id);
  try {
    await updateDoc(doc(db, "events", eventId), { attendees: attendees, attendeesId: attendeesId });
  } catch (error) {
    console.log(error);
  }
};

export const leaveEvent = async ({ eventId, user }) => {
  try {
    let event;
    const eventSnapshot = await getDoc(doc(db, "events", eventId));
    if (eventSnapshot.exists()) {
      event = eventSnapshot.data();
      const attendees = event.attendees.filter((att) => att.id !== user.id);
      await updateDoc(doc(db, "events", eventId), { attendeesId: arrayRemove(user.id), attendees: attendees });
    }
  } catch (error) {
    console.log(error);
  }
};
