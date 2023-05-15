import React, { useEffect, useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { Stack, Divider } from "@mui/material";
import ImageCropper from "./ImageCropper";
import ImagePreview from "./ImagePreview";

const ImageUploader = () => {
  const [files, setFiles] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      justifyContent="space-between"
    >
      <ImageDropzone setFiles={setFiles} files={files} />
      {files?.length > 0 && <ImageCropper image={files} setCroppedImage={setCroppedImage} />}
      {files?.length > 0 && <ImagePreview filename={files[0].name} image={croppedImage} setLoading={setLoading} />}
    </Stack>
  );
};

export default ImageUploader;
