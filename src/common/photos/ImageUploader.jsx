import React, { useEffect, useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { Stack, Divider, Button, ButtonGroup, Box } from "@mui/material";
import ImageCropper from "./ImageCropper";
import ImagePreview from "./ImagePreview";
import { v4 as uuidv4 } from "uuid";
import getFileExtension from "../util/getFileExtension";
import { uploadFile } from "../../firestore/firestore";
import { FileUploadOutlined, DeleteOutlined } from "@mui/icons-material";

const ImageUploader = () => {
  const [files, setFiles] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetUpload = () => {
    setFiles(null);
    setCroppedImage(null);
    setLoading(false);
  };

  const handleUpload = async ({ image, filename }) => {
    setLoading(true);
    const uniqueFilename = `${uuidv4()}${getFileExtension(filename)}`;
    await uploadFile({ image: image, filename: uniqueFilename });
    resetUpload();
  };

  return (
    <Stack spacing={2}>
      <ImageDropzone setFiles={setFiles} files={files} />
      {files && (
        <ButtonGroup sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="small"
            endIcon={<DeleteOutlined />}
            sx={{ textTransform: "none", fontWeight: 700 }}
            onClick={resetUpload}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            endIcon={<FileUploadOutlined />}
            sx={{ textTransform: "none", fontWeight: 700 }}
            onClick={() => handleUpload({ image: croppedImage, filename: files[0].name })}
          >
            Upload
          </Button>
        </ButtonGroup>
      )}
      <Stack
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={4}
        sx={{ justifyItems: "center" }}
      >
        {files?.length > 0 && <ImageCropper image={files} setCroppedImage={setCroppedImage} />}
        {files?.length > 0 && <ImagePreview />}
      </Stack>
    </Stack>
  );
};

export default ImageUploader;
