import React, { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Chip, Avatar, Box, Input, Typography, Stack } from "@mui/material";

const ImageDropzone = ({ setFiles, files }) => {
  const baseStyle = {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    textAlign: "center",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

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

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Stack sx={style} spacing={2}>
      <Box {...getRootProps()}>
        <Input type="file" {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <>
            <Typography>Drag 'n' drop some files here, or click to select files</Typography>
            <Typography>(1 files are the maximum number of files you can drop here)</Typography>
          </>
        )}
      </Box>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2">Accepted files</Typography>
          {files &&
            acceptedFiles?.map(file => (
              <Box key={file.name}>
                <Chip
                  avatar={<Avatar alt="preview" src={file.preview} />}
                  label={file.name}
                  variant="filled"
                  color="success"
                />
                <Typography>{file.size} bytes</Typography>
              </Box>
            ))}
        </Box>
        <Box>
          <Typography variant="body2">Rejected files</Typography>
          {files &&
            fileRejections.map(({ file, errors }) => (
              <Box key={file.path}>
                <Chip
                  avatar={<Avatar alt="Natacha" src={file.preview} />}
                  label={file.name}
                  variant="filled"
                  color="success"
                />
                <Typography>{file.size} bytes</Typography>
                {errors.map(e => (
                  <Typography key={e.code}>{e.message}</Typography>
                ))}
              </Box>
            ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default ImageDropzone;
