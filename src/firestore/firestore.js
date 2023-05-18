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
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
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

export const db = getFirestore(app);
export const storage = getStorage(app);
import { auth } from "../config/firebase";

export const createArrayUnion = array => {
  return arrayUnion(...array);
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
  return onSnapshot(query(collection(db, collectionRef), q && q), snapshot => {
    const docs = [];
    snapshot.forEach(doc => {
      const docData = doc.data();
      for (const prop in docData) {
        if (docData[prop] instanceof Timestamp) {
          docData[prop] = docData[prop].toDate().toISOString();
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

// setDoc(doc(db, "users", auth.currentUser.uid, "photos", filename), {
//   name: filename,
//   url: downloadURL,
// });

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
