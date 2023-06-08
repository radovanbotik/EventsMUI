import { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { Stack, Divider, Button, Box, Toolbar, Tooltip, IconButton } from "@mui/material";
import ImageCropper from "./ImageCropper";
import ImagePreview from "./ImagePreview";
import { FileUploadOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import { addImage } from "../../firestore/profileActions";
import ModalWrapper from "../modals/ModalWrapper";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/modalSlice";

const ImageUploader = () => {
  const [files, setFiles] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const resetUpload = () => {
    setFiles(null);
    setCroppedImage(null);
    setLoading(false);
  };

  const handleUpload = async ({ image, filename }) => {
    setLoading(true);
    addImage({ image: image, filename: filename });
    resetUpload();
  };

  return (
    <ModalWrapper title="New photo">
      <Stack spacing={2}>
        <ImageDropzone setFiles={setFiles} files={files} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
          sx={{ justifyItems: "center" }}
        >
          {/* {files?.length > 0 && (
            <Button
              onClick={() =>
                dispatch(
                  openModal({ modalType: "cropper", modalProps: { image: files, setCroppedImage: setCroppedImage } })
                )
              }
            >
              Crop
            </Button>
          )} */}
          {files?.length > 0 && <ImageCropper image={files} setCroppedImage={setCroppedImage} />}
          {files?.length > 0 && <ImagePreview />}
        </Stack>
        {files && (
          <Toolbar variant="dense">
            {/* <Button
              variant="text"
              endIcon={<DeleteOutlined />}
              sx={{ textTransform: "capitalize" }}
              onClick={resetUpload}
            >
              Cancel
            </Button> */}
            <Button
              variant="contained"
              size="small"
              endIcon={<FileUploadOutlined />}
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                handleUpload({ image: croppedImage, filename: files[0].name });
                dispatch(closeModal());
              }}
            >
              Upload
            </Button>
            <Tooltip title="Discard" placement="top">
              <IconButton onClick={resetUpload} sx={{ marginLeft: "auto" }}>
                <DeleteForeverOutlined />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
      </Stack>
    </ModalWrapper>
  );
};

export default ImageUploader;
