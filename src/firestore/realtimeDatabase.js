import { auth, database } from "../config/firebase";
import { ref, set, onValue, push, orderByKey, query, limitToLast } from "firebase/database";

const user = auth.currentUser;

//will overwrite data
export const writeUserData = async (user) => {
  set(ref(database, `users/${user.id}`), {
    username: user.username,
    email: user.email,
    photoURL: user.photoURL,
  });
};

export const listenToEventChat = async (eventId) => {
  const eventRef = ref(database, `events/${eventId}/comments`);
  onValue(eventRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(Object.values(data));
    console.log(Object.entries(data));
    //perform action
    //update number of messages in main group
  });
};

export const addCommentToEvent = async ({ post, id }) => {
  const locationRef = ref(database, `events/${id}/comments`);
  const newPostLocationRef = push(locationRef);
  set(newPostLocationRef, {
    ...post,
    displayName: user.displayName,
    photoURL: user.photoURL,
    userId: user.uid,
    createdAt: Date.now(),
  });
};

export const addReplyToEventMessage = async ({ reply, eventId, commentId }) => {
  const locationRef = ref(database, `events/${eventId}/comments`);
  const newPostLocationRef = push(locationRef);
  set(newPostLocationRef, {
    ...reply,
    commentId: commentId,
    displayName: user.displayName,
    photoURL: user.photoURL,
    userId: user.uid,
    createdAt: Date.now(),
  });
};

export const listenToLocation = async ({ location, action }) => {
  // const locationRef = ref(database, location);
  const locationRef = query(ref(database, location), limitToLast(10));
  onValue(locationRef, (snapshot) => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    const comments = Object.entries(snapshot.val())
      .reverse()
      .map((array) => ({ id: array[0], ...array[1] }));
    action(comments);
  });
};
