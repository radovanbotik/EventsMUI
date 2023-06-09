import { Link, Stack, Typography } from "@mui/material";

const Title = () => {
  return (
    <Stack pt={10} pb={5}>
      <Typography variant="h3" gutterBottom>
        Get Started
      </Typography>
      <Typography variant="body2">
        Already have an account? <Link underline="hover">Login</Link>
      </Typography>
    </Stack>
  );
};

export default Title;
