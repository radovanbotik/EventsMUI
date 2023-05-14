import { AccountCircle, ModeEdit } from "@mui/icons-material";
import { Box, AppBar, Button, Toolbar, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import PhotosImageList from "./PhotosImageList";
import ImageUploader from "../../../common/photos/ImageUploader";

const PhotosPanel = ({ props }) => {
  const [editing, setEditing] = useState(false);
  console.log(props);

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
              onClick={() => setEditing(prev => !prev)}
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
              <Typography>Number of photos: 10</Typography>
              <PhotosImageList />
            </Stack>
          </Toolbar>
        </Box>
      )}
    </div>
  );
};

export default PhotosPanel;
