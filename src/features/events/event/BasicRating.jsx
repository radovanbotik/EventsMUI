import * as React from "react";
import { Box, Rating, Stack, Typography } from "@mui/material";

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="caption2" fontWeight={600}>
        Rating
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Stack>
  );
}
