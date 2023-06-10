import { Container, Grid, Paper, Typography } from "@mui/material";
import AccountForm from "./AccountForm";

const Account = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Account details:</Typography>
      <AccountForm />
    </Container>
  );
};

export default Account;
