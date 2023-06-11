/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const HeadingH6 = ({ children }) => {
  return (
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
      {children}
    </Typography>
  );
};

export default HeadingH6;
