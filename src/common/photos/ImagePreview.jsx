import { Button, ButtonGroup } from "@mui/material";
import { db, storage } from "../../firestore/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

const ImagePreview = ({ image }) => {
  const uploadFile = async ({ user, image }) => {
    const storageRef = ref(storage);
    const imageAndStorageRef = ref(storageRef, `${user.uid}/user_images/${image.filename}`);
    const uploadTask = await uploadBytesResumable(imageAndStorageRef, image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("success");
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const changeProfilePicture = async ({ user, collection, imageURL }) => {
    const documentRef = doc(db, collection, user.uid);
    try {
      const update = await updateDoc(documentRef, {
        photoURL: imageURL,
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="img-cropped" style={{ height: "100%", width: "100%", overflow: "hidden" }}></div>
      <ButtonGroup fullWidth>
        <Button>cancel</Button>
        <Button>submit</Button>
      </ButtonGroup>
    </div>
  );
};

export default ImagePreview;
