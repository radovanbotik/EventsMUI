/* eslint-disable react/no-unescaped-entities */
import { Link, Stack, Typography } from "@mui/material";

const Title = ({ member, setMember }) => {
  if (member) {
    return (
      <Stack pt={10} pb={5}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Login
        </Typography>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link
            underline="hover"
            fontWeight={700}
            sx={{ cursor: "pointer" }}
            onClick={() => setMember((prev) => !prev)}
          >
            Get Started
          </Link>
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack pt={10} pb={5}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Get Started
      </Typography>
      <Typography variant="body2">
        Already have an account?{" "}
        <Link underline="hover" fontWeight={700} sx={{ cursor: "pointer" }} onClick={() => setMember((prev) => !prev)}>
          Login
        </Link>
      </Typography>
    </Stack>
  );
};

export default Title;
