import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AccountForm from "../features/AccountForm";
import { Face } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Account = () => {
  const { currentUser } = useSelector(store => store.authReducer);

  return (
    <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
      {/* <Grid item lg={Number(`${isOpen ? 8 : 12}`)} xs={6}> */}
      <Grid item lg={12} xs={12} order={2}>
        <Paper>
          <Typography variant="h4">Account details:</Typography>
          <AccountForm />
        </Paper>
      </Grid>
      {/* <Grid item lg={4} xs={6} order={1}>
        <Paper>
          {!currentUser ? (
            <div>...loading</div>
          ) : (
            <Card>
              {currentUser.providerId === "password" ? (
                <CardMedia
                  component="img"
                  src={currentUser.photoURL || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"}
                />
              ) : (
                <Avatar
                  alt="user"
                  src={currentUser.photoURL || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"}
                />
              )}
              <CardContent>
                <Divider></Divider>
                <Typography variant="h5" gutterBottom textAlign="center">
                  {currentUser.displayName ? currentUser.displayName : currentUser.email}
                </Typography>
                <Divider>
                  <Chip icon={<Face />} label="About me" variant="outlined"></Chip>
                </Divider>
                <Typography gutterBottom>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem error, similique quia itaque nam magni
                  libero magnam optio fugiat repudiandae odio eaque saepe! Similique velit nihil accusamus consequatur
                  quisquam ullam?
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Follow user</Button>
              </CardActions>
            </Card>
          )}
        </Paper>
      </Grid> */}
    </Grid>
  );
};

export default Account;
