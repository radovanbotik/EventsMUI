import { useState } from "react";
import UsersList from "./UsersList";
import { useSelector } from "react-redux";
import useSubscribeToUsers from "../../../hooks/useSubscribeToUsers";
import { Container } from "@mui/system";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { status } = useSelector((store) => store.eventReducer);

  useSubscribeToUsers({
    dependancies: [],
    action: (users) => setUsers(users),
  });
  if (status === "loading") return <div>loading...</div>;
  return (
    <Container maxWidth="lg">
      <UsersList users={users}></UsersList>
    </Container>
  );
};

export default Users;
