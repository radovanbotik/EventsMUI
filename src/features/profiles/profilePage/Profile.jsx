import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
// import ProfileContent from "./ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import { setViewedUser } from "../../../store/profileSlice";
import useSubscribeTodocument from "../../../hooks/useSubscribeTodocument";
import { CircularProgress, Box } from "@mui/material";
import { auth } from "../../../config/firebase";
import { useEffect, useState } from "react";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.profileReducer);
  const { status } = useSelector(store => store.eventReducer);

  const [owner, setOwner] = useState(false);

  useSubscribeTodocument({
    dbcollection: "users",
    documentId: id,
    dependancies: [id],
    data: userData => dispatch(setViewedUser(userData)),
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

  if (status === "loading")
    return (
      <Box sx={{ display: "grid", height: "100vh", width: "100%", placeContent: "center" }}>
        <CircularProgress></CircularProgress>
      </Box>
    );

  return (
    <>
      <ProfileHeader props={{ ...user, owner: owner }} />
      {/* <ProfileContent props={{ ...user, owner: owner }} /> */}
    </>
  );
};

export default Profile;
