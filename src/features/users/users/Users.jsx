import { useState } from "react";
import UsersList from "./UsersList";
import { useSelector } from "react-redux";
import useSubscribeToUsers from "../../../hooks/useSubscribeToUsers";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { status } = useSelector((store) => store.eventReducer);

  useSubscribeToUsers({
    dependancies: [],
    action: (users) => setUsers(users),
  });
  if (status === "loading") return <div>loading...</div>;
  return (
    <>
      <UsersList users={users}></UsersList>
    </>
  );
};

export default Users;
