/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */

const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { onDocumentCreated, onDocumentDeleted } = require("firebase-functions/v2/firestore");
const app = initializeApp();
const db = getFirestore(app);

exports.addFollow = onDocumentCreated("following/{loggedUserId}/following/{userToFollowId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the user");
    return;
  }
  const followers = snapshot.data();
  console.log(followers);
  try {
    const userToFollow = await db.collection("users").doc(event.params.userToFollowId).get();
    const batch = db.batch();
    batch.set(
      db
        .collection("following")
        .doc(event.params.userToFollowId)
        .collection("followers")
        .doc(event.params.loggedUserId),
      {
        displayName: userToFollow.data().displayName,
        photoURL: userToFollow.data().photoURL,
        id: userToFollow.id,
      }
    );
    batch.update(db.collection("users").doc(event.params.userToFollowId), {
      followers: FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    return console.log(error);
  }
});

exports.removeFollow = onDocumentDeleted("following/{loggedUserId}/following/{userToUnfollowId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the user");
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
    return console.log(error);
  }
});
