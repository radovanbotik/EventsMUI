import { auth, database } from "../config/firebase";
import { ref, set, onValue, push, orderByKey, query, limitToLast } from "firebase/database";

const user = auth.currentUser;

//will overwrite data
export const writeUserData = async (user) => {
  await set(ref(database, `users/${user.id}`), {
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
  await set(newPostLocationRef, {
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
  await set(newPostLocationRef, {
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
    const comments = Object.entries(snapshot.val())
      .reverse()
      .map((array) => ({ id: array[0], ...array[1] }));
    action(comments);
  });
};

export const listenToNewsfeed = async (userId) => {
  const users = query(ref(database, `posts/${userId}`), orderByKey(), limitToLast(10));
  onValue(
    users,
    (snapshot) => {
      if (!snapshot.exists()) {
        console.log("no feed to show");
        return;
      }
      const data = snapshot.val();
      const dataEntries = Object.entries(data);
      const posts = dataEntries.map((action) => ({
        postId: action[0],
        ...action[1],
      }));
      console.log(posts);
    },
    (error) => {
      console.log("hi");
      console.log(error);
    }
  );
};
