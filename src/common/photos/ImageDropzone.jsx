import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Chip, Avatar } from "@mui/material";

const ImageDropzone = ({ setFiles, files }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      // console.log(acceptedFiles);s
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ style: { backgroundColor: "red", border: "dashed 1px #000", flex: 1 } })}>
      <input {...getInputProps({ style: { backgroundColor: "gold" } })} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>not active</p>}
      {files?.map(file => (
        <Chip
          key={file.name}
          avatar={<Avatar alt="Natacha" src={file.preview} />}
          label={file.name}
          variant="filled"
          color="success"
        />
      ))}
    </div>
  );
};

export default ImageDropzone;
