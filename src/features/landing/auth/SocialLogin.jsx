import { Avatar, Button, IconButton, Stack } from "@mui/material";
import google from "../../../common/icons/google.png";
import facebook from "../../../common/icons/facebook.png";
import { signUserWithGoogle } from "../../../firestore/userActions";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        size="large"
        disableElevation
        fullWidth
        startIcon={<Avatar src={google} />}
        sx={{ "& .MuiButton-startIcon": { m: 0 } }}
        onClick={() => {
          signUserWithGoogle({ action: () => navigate("/events") });
        }}
      />
      <Button
        variant="outlined"
        size="large"
        disableElevation
        fullWidth
        startIcon={<Avatar src={facebook} />}
        sx={{ "& .MuiButton-startIcon": { m: 0 } }}
      />
    </Stack>
  );
};

export default SocialLogin;
