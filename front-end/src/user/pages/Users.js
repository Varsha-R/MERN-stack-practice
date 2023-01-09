import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Varsha",
      image:
        "https://storage.googleapis.com/kaggle-avatars/images/1409885-kg.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
