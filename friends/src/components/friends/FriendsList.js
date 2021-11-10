import React, { useState, useEffect, Fragment } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import axiosWithAuth from "../../utils/axiosWithAuth";
import axios from "axios";

import Friend from "./Friend";
import { Typography, Container } from "@mui/material";

export default function Friendslist() {
  const [friends, setFriends] = useState([]);

  const handleDelete = (id) => {
    const newFriends = friends.slice(0).filter((friend) => friend.id !== id);

    // Just figured out that the server does stay open somehow, when I refresh the data is still the same, I believe this comes from nodemon. So running a server localy has a whole new meaning now.
    axios
      .delete("http://localhost:5000/api/friends", { data: newFriends })
      .then((res) => {
        setFriends(res.data);
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, []);

  return (
    <Container maxWidth="sm" style={{ margin: "3rem auto auto" }}>
      <Typography
        sx={{ display: "inline", fontWeight: "bold" }}
        component="span"
        variant="h5"
        color="text.primary"
      >
        Your Friends
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
      >
        {friends.map(({ ...rest }, i) => {
          return (
            <Fragment key={i}>
              <Friend {...rest} handleDelete={handleDelete} />
              <Divider variant="inset" component="li" />
            </Fragment>
          );
        })}
      </List>
    </Container>
  );
}
