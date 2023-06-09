import { Divider, Chip, Box } from "@mui/material";

const CustomDivider = () => {
  return (
    <Box>
      <Divider sx={{ p: 3 }} variant="fullWidth" flexItem={true}>
        <Chip label="OR" size="small" disabled />
      </Divider>
    </Box>
  );
};

export default CustomDivider;
