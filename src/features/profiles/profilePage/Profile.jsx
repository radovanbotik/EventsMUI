import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/profileSlice";
import useSubscribeTodocument from "../../../hooks/useSubscribeTodocument";
import { CircularProgress, Box } from "@mui/material";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.profileReducer);
  const { status } = useSelector(store => store.eventReducer);
  console.log(user);

  useSubscribeTodocument({
    dbcollection: "users",
    documentId: id,
    dependancies: [],
    data: userData => dispatch(setUser(userData)),
  });
  if (status === "loading")
    return (
      <Box sx={{ display: "grid", height: "100vh", width: "100%", placeContent: "center" }}>
        <CircularProgress></CircularProgress>
      </Box>
    );

  return (
    <>
      <ProfileHeader {...user} />
      <ProfileContent {...user} />
    </>
  );
};

export default Profile;