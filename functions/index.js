/* eslint-disable require-jsdoc */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */

const { logger } = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getDatabase, ServerValue } = require("firebase-admin/database");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { onDocumentCreated, onDocumentDeleted, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const app = initializeApp();
const db = getFirestore(app);
const database = getDatabase(app);

exports.addFollow = onDocumentCreated("following/{loggedUserId}/following/{userToFollowId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log("No data associated with the user");
    return;
  }
  try {
    const loggedUser = await db.collection("users").doc(event.params.loggedUserId).get();
    const batch = db.batch();
    batch.set(
      db
        .collection("following")
        .doc(event.params.userToFollowId)
        .collection("followers")
        .doc(event.params.loggedUserId),
      {
        displayName: loggedUser.data().displayName,
        photoURL: loggedUser.data().photoURL,
        id: loggedUser.id,
      }
    );
    batch.update(db.collection("users").doc(event.params.userToFollowId), {
      followers: FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    return logger.log(error);
  }
});

exports.removeFollow = onDocumentDeleted("following/{loggedUserId}/following/{userToUnfollowId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log("No data associated with the user");
    return;
  }
  try {
    const batch = db.batch();
    batch.delete(
      db
        .collection("following")
        .doc(event.params.userToUnfollowId)
        .collection("followers")
        .doc(event.params.loggedUserId)
    );
    batch.update(db.collection("users").doc(event.params.userToUnfollowId), {
      followers: FieldValue.increment(-1),
    });
    return await batch.commit();
  } catch (error) {
    return logger.log(error);
  }
});

function newPost(user, action, eventId, title) {
  return {
    photoURL: user.photoURL || null,
    displayName: user.displayName,
    userId: user.id,
    eventId: eventId,
    title: title,
    date: ServerValue.TIMESTAMP,
    action: action,
  };
}

exports.onJoinAndLeaveEvent = onDocumentUpdated("events/{eventId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    return;
  }
  const before = event.data.before.data();
  const after = event.data.after.data();

  // if (after.name == before.name) {
  //   return null;
  // }

  if (before.attendees.length < after.attendees.length) {
    const newAttendee = after.attendees.filter((i1) => !before.attendees.some((i2) => i2.id === i1.id))[0];
    try {
      const newAttendeeFollowers = await db.collection("following").doc(newAttendee.id).collection("followers").get();
      return newAttendeeFollowers.forEach((follower) => {
        database.ref(`/posts/${follower.id}`).push(newPost(newAttendee, "join", event.params.eventId, after.title));
      });
    } catch (error) {
      return logger.log(error);
    }
  }
  if (before.attendees.length > after.attendees.length) {
    const leavingAttendee = before.attendees.filter((i1) => !after.attendees.some((i2) => i2.id === i1.id))[0];
    try {
      const leavingAttendeeFollowers = await db
        .collection("following")
        .doc(leavingAttendee.id)
        .collection("followers")
        .get();
      return leavingAttendeeFollowers.forEach((follower) => {
        database
          .ref(`/posts/${follower.id}`)
          .push(newPost(leavingAttendee, "leave", event.params.eventId, after.title));
      });
    } catch (error) {
      return logger.log(error);
    }
  }
});
