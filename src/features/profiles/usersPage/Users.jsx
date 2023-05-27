import React, { useState } from "react";
import UsersList from "./UsersList";
import useSubscribeTocollection from "../../../hooks/useSubscribeTocollection";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { status } = useSelector((store) => store.eventReducer);
  const dispatch = useDispatch();

  useSubscribeTocollection({
    collectionRef: "users",
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
