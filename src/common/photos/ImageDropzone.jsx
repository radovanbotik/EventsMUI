import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Chip, Avatar } from "@mui/material";

const ImageDropzone = ({ setFiles, files }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      // console.log(acceptedFiles);s
      setFiles(prev =>
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
  });

  return (
    <div style={{ backgroundColor: "red", border: "dashed 1px #000", flex: 1 }}>
      <div {...getRootProps()}>
        <input {...getInputProps({ style: { backgroundColor: "gold" } })} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(1 files are the maximum number of files you can drop here)</em>
          </>
        )}
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
      <aside>
        <h4>Accepted files</h4>
        {/* <ul>{acceptedFileItems}</ul> */}
        <h4>Rejected files</h4>
        {/* <ul>{fileRejectionItems}</ul> */}
      </aside>
    </div>
  );
};

export default ImageDropzone;
