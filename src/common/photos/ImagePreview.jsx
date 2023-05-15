import { Button, ButtonGroup } from "@mui/material";
import { db, storage } from "../../firestore/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import getFileExtension from "../util/getFileExtension";

const ImagePreview = ({ image, filename, setLoading }) => {
  const uploadFile = async ({ image, filename }) => {
    //reference to
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

  const changeProfilePicture = async ({ user, collection, imageURL }) => {
    const documentRef = doc(db, collection, user.uid);
    try {
      const updateCollection = await updateDoc(documentRef, {
        photoURL: imageURL,
      });
      const updateUser = await auth.updateUser(user.uid, {
        photoURL: imageURL,
      });
      console.log("success");
      console.log(updateCollection);
      console.log(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (image, filename) => {
    setLoading(true);
    const uniqueFilename = `${uuidv4()}${getFileExtension(filename)}`;
    await uploadFile({ image: image, filename: uniqueFilename });
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, aspectRatio: 16 / 9 }}>
      <div
        className="img-cropped"
        style={{ height: "100%", width: "100%", overflow: "hidden", aspectRatio: 16 / 9 }}
      ></div>
      <ButtonGroup fullWidth>
        <Button>cancel</Button>
        <Button onClick={() => handleUpload(image, filename)}>submit</Button>
      </ButtonGroup>
    </div>
  );
};

export default ImagePreview;
