import { Avatar, Button, IconButton, Stack } from "@mui/material";
import google from "../../../common/icons/google.png";
import facebook from "../../../common/icons/facebook.png";

const SocialLogin = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        size="large"
        disableElevation
        fullWidth
        startIcon={<Avatar src={google} />}
        sx={{ "& .MuiButton-startIcon": { m: 0 } }}
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
