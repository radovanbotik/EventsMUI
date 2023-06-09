import { Grid, Paper, Typography } from "@mui/material";
import AccountForm from "./AccountForm";

const Account = () => {
  return (
    <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
      {/* <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}> */}
      <Grid item lg={12} xs={12} order={2}>
        <Paper>
          <Typography variant="h4">Account details:</Typography>
          <AccountForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Account;
