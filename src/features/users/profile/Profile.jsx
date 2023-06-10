import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import { setViewedUser } from "../../../store/profileSlice";
import { CircularProgress, Box, Container } from "@mui/material";
import { auth } from "../../../config/firebase";
import { useEffect, useState } from "react";
import useSubscribeToUser from "../../../hooks/useSubscribeToUser";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profileReducer);
  const { status } = useSelector((store) => store.profileReducer);
  const [owner, setOwner] = useState(false);

  useSubscribeToUser({
    userId: id,
    action: (user) => dispatch(setViewedUser(user)),
    dependancies: [id],
  });

  const isOwner = () => {
    if (id === auth.currentUser?.uid) {
      return setOwner(true);
    } else {
      return setOwner(false);
    }
  };
  useEffect(() => {
    isOwner();
  }, [status, id]);

  if (status === "loading" || !user)
    return (
      <Box
        sx={{
          display: "grid",
          height: "100vh",
          width: "100%",
          placeContent: "center",
        }}
      >
        <CircularProgress></CircularProgress>
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <ProfileHeader {...user} owner={owner} />
      <ProfileContent {...user} owner={owner} />
    </Container>
  );
};

export default Profile;
