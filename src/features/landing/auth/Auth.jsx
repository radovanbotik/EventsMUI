import { Box } from "@mui/material";
import Logo from "./Logo";
import Title from "./Title";
import SocialLogin from "./SocialLogin";
import CustomDivider from "./CustomDivider";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useState } from "react";

const Auth = () => {
  const [member, setMember] = useState(false);

  return (
    <Box sx={{ width: "480px", px: 10, py: 8 }} direction="column">
      <Logo />
      <Title member={member} setMember={setMember} />
      <SocialLogin />
      <CustomDivider />
      {member ? <LoginForm /> : <RegisterForm />}
    </Box>
  );
};

export default Auth;
