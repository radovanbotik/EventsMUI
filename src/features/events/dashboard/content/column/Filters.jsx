import React from "react";
import { Stack, Badge, Typography } from "@mui/material";

const Filters = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Explore Events:
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center">
        <Badge color="primary" variant="dot" sx={{ transform: "translateX(5px)" }} />
        <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Avaible Events
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        <Badge color="primary" variant="dot" sx={{ transform: "translateX(5px)" }} />
        <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Events Hosting
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        <Badge color="primary" variant="dot" sx={{ transform: "translateX(5px)" }} />
        <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Events Attending
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        <Badge color="primary" variant="dot" sx={{ transform: "translateX(5px)" }} />
        <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Expired Events
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Filters;
