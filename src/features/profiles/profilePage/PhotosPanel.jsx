import React, { useEffect, useState } from "react";
import { AccountCircle, ModeEdit } from "@mui/icons-material";
import { Box, AppBar, Button, Toolbar, Typography, Stack } from "@mui/material";
import ImageUploader from "../../../common/photos/ImageUploader";
import PhotosImageList from "./PhotosImageList";
import { onSnapshot, doc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firestore/firestore";

const PhotosPanel = ({ props }) => {
  const [editing, setEditing] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", props.id, "photos"),
      (snapshot) => {
        const photos = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          photos.push(data);
        });
        setPhotos(photos);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>User photos</Typography>
          {props.owner && (
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "primary.light" }}
              // endIcon={<ModeEdit sx={{ width: 16, height: 16 }} />}
              onClick={() => setEditing((prev) => !prev)}
            >
              {editing ? "Cancel" : "Add photo"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {editing ? (
        <ImageUploader />
      ) : (
        <Box>
          <Toolbar disableGutters>
            <Stack>
              {/* <Typography>Number of photos: {photos.current?.length}</Typography> */}
              <PhotosImageList photos={photos} owner={props.owner} />
            </Stack>
          </Toolbar>
        </Box>
      )}
    </div>
  );
};

export default PhotosPanel;
