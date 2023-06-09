import { Stack, Box } from "@mui/material";
import Logo from "./Logo";
import Title from "./Title";
import SocialLogin from "./SocialLogin";
import CustomDivider from "./CustomDivider";
import LoginForm from "./LoginForm";

const Auth = () => {
  return (
    <Box sx={{ width: "480px", px: 10, py: 8 }} direction="column">
      <Logo />
      <Title />
      <SocialLogin />
      <CustomDivider />
      <LoginForm />
    </Box>
  );
};

export default Auth;
