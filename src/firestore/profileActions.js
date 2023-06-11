import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../config/firebase";
import { toast } from "react-toastify";
import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import getFileExtension from "../common/util/getFileExtension";

export const readUser = async ({ id, action }) => {
  const user = doc(db, "users", id);
  try {
    const docSnap = await getDoc(user);
    if (docSnap.exists()) {
      action(docSnap.data());
    } else {
      throw new Error("no such user, check id");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ updates }) => {
  try {
    await updateProfile(auth.currentUser, updates);
    await updateDoc(doc(db, "users", auth.currentUser.uid), updates);
    toast.success("Your profile has been updated.");
  } catch (error) {
    toast.error(`${error.message}`);
  }
};

export const deleteImage = async ({ imageName, userId }) => {
  if (userId !== auth.currentUser.uid) throw new Error("you are trying to delete a file you dont own.");
  try {
    const filepath = `${auth.currentUser.uid}/user_images/${imageName}`;
    const fileRef = ref(storage, filepath);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "photos", imageName));
    toast.success("Image has been deleted.");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const addImage = async ({ image, filename }) => {
  try {
    const uniqueFilename = `${uuidv4()}${getFileExtension(filename)}`;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `${auth.currentUser.uid}/user_images/${uniqueFilename}`);
    const upload = uploadBytesResumable(imageRef, image);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.success(`Upload is ${progress}% done.`);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(upload.snapshot.ref);
        setDoc(doc(db, "users", auth.currentUser.uid, "photos", uniqueFilename), {
          name: filename,
          url: url,
        });
      }
    );
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const addProfileImage = async ({ photoURL, userId }) => {
  if (userId === auth.currentUser.uid) {
    try {
      await updateProfile(auth.currentUser, { photoURL: photoURL });
      await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL: photoURL });
      toast.success("Your profile has been updated.");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  }
};

export const addFollow = async ({ userToFollow, loggedUser }) => {
  const batch = writeBatch(db);
  // batch.set(doc(db, "following", userToFollow.id, "followers", loggedUser.id), loggedUser);
  batch.set(doc(db, "following", loggedUser.id, "following", userToFollow.id), userToFollow);
  // batch.update(doc(db, "users", userToFollow.id), { followers: increment(1) });
  batch.update(doc(db, "users", loggedUser.id), { following: increment(1) });
  try {
    await batch.commit();
    toast.success(`You are now following ${userToFollow.displayName}`);
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const removeFollow = async ({ userToUnfollow, loggedUser }) => {
  const batch = writeBatch(db);
  // batch.delete(doc(db, "following", userToUnfollow.id, "followers", loggedUser.id));
  batch.delete(doc(db, "following", loggedUser.id, "following", userToUnfollow.id));
  // batch.update(doc(db, "users", userToUnfollow.id), { followers: increment(-1) });
  batch.update(doc(db, "users", loggedUser.id), { following: increment(-1) });
  try {
    await batch.commit();
    toast.success(`You unfollowed ${userToUnfollow.displayName}`);
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};
