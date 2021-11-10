import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import axiosWithAuth from "../../utils/axiosWithAuth";

import { nanoid } from "nanoid";
import Friend from "./Friend";
import { Typography, Container } from "@mui/material";

export default function Friendslist() {
  const [friends, setFriends] = useState([]);

  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
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
        {friends.map(({ ...rest }) => {
          return (
            <>
              <Friend {...rest} key={nanoid(3)} handleDelete={handleDelete} />
              <Divider key={nanoid(5)} variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </Container>
  );
}
