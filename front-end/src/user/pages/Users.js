import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Varsha",
      image:
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/bust-in-silhouette_1f464.png",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
