import { app, auth } from "../config/firebase";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

const database = getDatabase(app);
const user = auth.currentUser;
console.log(user);

//will overwrite data
export const writeUserData = async user => {
  set(ref(database, `users/${user.id}`), {
    username: user.username,
    email: user.email,
    photoURL: user.photoURL,
  });
};

export const listenToEventChat = async eventId => {
  const eventRef = ref(database, `events/${eventId}/comments`);
  onValue(eventRef, snapshot => {
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
    id: user.uid,
    createdAt: Date.now(),
  });
};

export const listenToLocation = async ({ location, action }) => {
  const locationRef = ref(database, location);
  onValue(locationRef, snapshot => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    console.log(Object.entries(data));
    action(Object.entries(data));
  });
};
