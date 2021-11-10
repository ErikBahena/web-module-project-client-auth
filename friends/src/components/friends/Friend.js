import React from "react";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Friend({ name, email, imageUrl, id, handleDelete }) {
  return (
    <ListItem className="friend" alignItems="center">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="a"
              variant="a"
              color="text.primary"
              href={`mailto:${email} `}
            >
              {email}
            </Typography>
          </React.Fragment>
        }
      />
      <IconButton
        size="medium"
        aria-label="delete friend"
        onClick={() => {
          handleDelete(id);
        }}
        color="inherit"
      >
        <HighlightOffIcon />
      </IconButton>
    </ListItem>
  );
}
