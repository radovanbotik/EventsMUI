import React, { useEffect, useState } from "react";
import { PhotoLibraryOutlined, AddPhotoAlternateOutlined } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Stack, Tooltip, IconButton } from "@mui/material";
import ImageUploader from "../../../common/photos/ImageUploader";
import PhotosImageList from "./PhotosImageList";
import useSubscribeToImages from "../../../hooks/useSubscribeToImages";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const PhotosPanel = ({ owner, id }) => {
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  useSubscribeToImages({
    userId: id,
    action: (photos) => setPhotos(photos),
    dependancies: [id],
  });
  return (
    <Box>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <PhotoLibraryOutlined sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>User photos</Typography>
          {owner && (
            <Tooltip title="Add new photo" sx={{ color: "inherit" }}>
              <IconButton
                onClick={() => {
                  dispatch(openModal({ modalType: "photo" }));
                }}
              >
                <AddPhotoAlternateOutlined />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar disableGutters>
          <Stack>
            <PhotosImageList photos={photos} owner={owner} />
          </Stack>
        </Toolbar>
      </Box>
    </Box>
  );
};

export default PhotosPanel;
