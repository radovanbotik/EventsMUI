import {
  Timestamp,
  addDoc,
  setDoc,
  query,
  getDocs,
  doc,
  arrayUnion,
  collection,
  updateDoc,
  deleteDoc,
  arrayRemove,
  getDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

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
    toast.success("You have added new event.");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const updateEvent = async ({ formdata, eventId, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to edit post that you did not create.");
  }
  const date = Timestamp.fromDate(formdata.date);
  try {
    await updateDoc(doc(db, "events", eventId), { ...formdata, date: date });
    toast.success("You have updated an event.");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const deleteEvent = async ({ eventId, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to delete post that you did not create.");
  }
  try {
    await deleteDoc(doc(db, "events", eventId));
    toast.success("You have deleted an event.");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const cancelEvent = async ({ eventId, cancelled, userId, hostId }) => {
  if (userId !== hostId) {
    throw new Error("You are trying to delete post that you did not create.");
  }
  try {
    await updateDoc(doc(db, "events", eventId), { cancelled: !cancelled });
    toast.success(`You have ${cancelled ? "activated" : "cancelled"} an event.`);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
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
  // await updateDoc(doc(db, "events", eventId), { attendees: attendees, attendeesId: attendeesId });
  try {
    await updateDoc(doc(db, "events", eventId), { attendees: attendees, attendeesId: attendeesId });
    toast.success("You have joined an event.");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
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
      toast.success("You have left an event.");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const favoriteEvent = async ({ event, user, favorited }) => {
  console.log(event, user, favorited);
  try {
    await setDoc(doc(db, "likes", event.id, "liked", user.id), {
      id: user.id,
      displayName: user.displayName,
      favorited: !favorited,
    });
    console.log("ran");
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async ({ event, user, action }) => {
  const docRef = doc(db, "likes", event.id, "liked", user.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    action(docSnap.data().favorited);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
