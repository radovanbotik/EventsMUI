import {
  getFirestore,
  doc,
  query,
  collection,
  getDoc,
  onSnapshot,
  Timestamp,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";

import { auth } from "../config/firebase";

export const db = getFirestore(app);
export const storage = getStorage(app);

//utility
export const convertDateToTimestamp = date => {
  return Timestamp.fromDate(date);
};
export const convertMillisToTimestamp = date => {
  return Timestamp.fromMillis(date);
};

export const createArrayUnion = array => {
  return arrayUnion(...array);
};
export const createQuery = ({ collectionRef, field, value, operator }) => {
  if (!field && !operator && !value) return query(collection(db, collectionRef));
  return query(collection(db, collectionRef), where(field, `${operator}`, value));
};
export const createCompoundQuery = ({ collectionRef, constraints }) => {
  if (!constraints) return query(collection(db, collectionRef));
  let chainedConstraints = constraints.map(obj => where(obj.field, obj.operator, obj.value));
  return query(collection(db, collectionRef), ...chainedConstraints);
};
//general operations
export const addToArrayDocument = async ({ collectionRef, documentRef, array, documentToAdd }) => {
  await updateDoc(doc(db, collectionRef, documentRef), { [array]: arrayUnion(documentToAdd) });
};
export const removeDocumentFromArray = async ({ collectionRef, documentRef, array, documentToRemove }) => {
  await updateDoc(doc(db, collectionRef, documentRef), { [array]: arrayRemove(documentToRemove) });
};

export const getDocumentOnce = async ({ collectionRef, documentId }) => {
  const docSnap = await getDoc(doc(db, collectionRef, documentId));
  if (docSnap.exists()) return docSnap.data();
};
export const addDocumentToCollection = async ({ collectionRef, document }) => {
  await addDoc(collection(db, collectionRef), document);
};
export const addDocumentWithIdToCollection = async ({ collectionRef, document, documentId }) => {
  await setDoc(doc(db, collectionRef, documentId), document);
};
export const updateDocument = async ({ collectionRef, document }) => {
  await updateDoc(doc(db, collectionRef, document.id), { ...document, updated: serverTimestamp() });
};
export const deleteDocument = async ({ collectionRef, docId }) => {
  await deleteDoc(doc(db, collectionRef, docId));
};
export const subscribeToCollection = ({ collectionRef, q, action }) => {
  return onSnapshot(q, snapshot => {
    const docs = [];
    snapshot.forEach(doc => {
      const docData = doc.data();
      for (const prop in docData) {
        if (docData[prop] instanceof Timestamp) {
          docData[prop] = docData[prop].toDate().getTime();
        }
      }
      docs.push({ id: doc.id, ...docData });
    });
    action(docs);
    error => {
      console.log(error);
    };
  });
};
export const deleteDocumentFromSubCollection = async ({
  collectionRef,
  document1,
  subcollectionRef,
  documentToDelete,
}) => {
  await deleteDoc(doc(db, collectionRef, document1, subcollectionRef, documentToDelete));
  console.log("removed");
};

//auth
export const createUserWithMail = async ({ email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(data => {
      const { user } = data;
      const newUserObject = {
        displayName: user.displayName || user.email,
        email: user.email,
        photoURL: user.photoURL || "https://i.stack.imgur.com/34AD2.jpg",
        phoneNumber: user.phoneNumber || null,
        createdAt: user.metadata.createdAt,
        creationTime: user.metadata.creationTime,
      };
      return { newUserObject, user };
    })
    .then(({ user, newUserObject }) =>
      addDocumentWithIdToCollection({ collectionRef: "users", documentId: user.uid, document: newUserObject })
    );
};
export const signWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const newUser = getAdditionalUserInfo(result).isNewUser;
  if (newUser) {
    const newUserObject = {
      displayName: user.displayName || user.email,
      email: user.email,
      photoURL: user.photoURL || "https://i.stack.imgur.com/34AD2.jpg",
      phoneNumber: user.phoneNumber || null,
      createdAt: user.metadata.createdAt,
      creationTime: user.metadata.creationTime,
    };
    await addDocumentWithIdToCollection({ collectionRef: "users", documentId: user.uid, document: newUserObject });
  }
};
export const signInUser = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => {
  await signOut(auth);
};
export const updateUserProfile = async updates => {
  await updateProfile(auth.currentUser, updates);
};

export const updateUserPassword = async password => {
  await updatePassword(auth.currentUser, password);
};

//storage
export const deleteFileFromStorage = async filepath => {
  const fileRef = ref(storage, filepath);
  await deleteObject(fileRef);
  console.log("removed");
};

export const uploadFile = async ({ image, filename }) => {
  const storageRef = ref(storage);
  const imageAndStorageRef = ref(storageRef, `${auth.currentUser.uid}/user_images/${filename}`);
  const uploadTask = uploadBytesResumable(imageAndStorageRef, image);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    error => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log("File available at", downloadURL);
        //users individual photo collection
        setDoc(doc(db, "users", auth.currentUser.uid, "photos", filename), {
          name: filename,
          url: downloadURL,
        });
      });
    }
  );
  console.log(uploadTask);
};
