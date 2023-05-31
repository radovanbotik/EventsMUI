import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const signUpNewUser = async ({ email, password }) => {
  try {
    const { user: userdata } = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      displayName: userdata.displayName || userdata.email,
      email: userdata.email,
      photoURL: userdata.photoURL,
      phoneNumber: userdata.phoneNumber,
      id: userdata.uid,
      createdAt: Timestamp.fromDate(dayjs(Number(userdata.metadata.createdAt)).toDate()),
    };

    await setDoc(doc(db, "users", userdata.uid), user);
    toast.success("You have succesfully registered.");
  } catch (error) {
    toast.error(`${error.message}`);
  }
};

export const signUserIn = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("You have signed in.");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
    toast.success("You have signed out.");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const signUserWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const isNewUser = getAdditionalUserInfo(result).isNewUser;
    if (isNewUser) {
      const newUser = {
        displayName: result.user.displayName || result.user.email,
        email: result.user.email,
        photoURL: result.user.photoURL || null,
        phoneNumber: result.user.phoneNumber || null,
        createdAt: Timestamp.fromDate(dayjs(Number(result.user.metadata.createdAt)).toDate()),
      };
      await setDoc(doc(db, "users", result.user.uid), newUser);
    }
    toast.success("You have signed in.");
  } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
  }
};

export const updateUsersPassword = async (password) => {
  try {
    toast.success("Your password has been changed.");
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    toast.error(`${error.message}`);
  }
};
