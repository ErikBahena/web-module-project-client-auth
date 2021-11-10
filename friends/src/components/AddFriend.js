import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormLabel,
  IconButton,
  Divider,
  Typography,
  MenuItem,
} from "@mui/material";

import axiosWithAuth from "../utils/axiosWithAuth";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const initialFormValues = {
  email: "",
  name: "",
  age: "",

  gender: "",
};

const initialFormError = "";

export default function AddFriend({ history }) {
  const [formState, setFormState] = useState(initialFormValues);
  const [formError, setFormError] = useState(initialFormError);

  const handleSubmit = (e) => {
    e.preventDefault();

    // This will get a random image of a certain gender
    if (formState.gender === "male") {
      const rndInt = Math.floor(Math.random() * (70 - 51 + 1)) + 51;
      //   I tried to setFormState to all previous state and add this new property of imageUrl, coudn't figure it out. I know this is not best practice!
      formState["imageUrl"] = `https://i.pravatar.cc/150?img=${rndInt}`;
    }

    if (formState.gender === "female") {
      const rndInt = Math.floor(Math.random() * (49 - 34 + 1)) + 34;
      formState["imageUrl"] = `https://i.pravatar.cc/150?img=${rndInt}`;
    }

    if (!formError) {
      axiosWithAuth()
        .post("/friends", formState)
        .then(() => {
          history.push("/friends");
        })
        .catch(() => {
          setFormError("All Fields Must Be Filled Out Properly");
        });
    }
  };

  const handleChange = (e) => {
    setFormError(initialFormError);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Box
      maxWidth="sm"
      component="form"
      sx={{
        mt: 4,
        p: 4,
        mr: "auto",
        ml: "auto",
        boxShadow: 2,
        borderRadius: 1,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <FormLabel sx={{ fontSize: "1.5rem", mt: 3 }}>Add a Friend</FormLabel>
      <TextField
        sx={{ width: "80%" }}
        id="standard-basic"
        label="Name"
        variant="standard"
        margin="normal"
        onChange={handleChange}
        error={!!formError}
        name="name"
        value={formState.name}
      />
      <TextField
        sx={{ width: "80%" }}
        fullWidth
        type="email"
        id="standard-basic"
        label="Email"
        variant="standard"
        margin="normal"
        onChange={handleChange}
        error={!!formError}
        name="email"
        value={formState.email}
      />
      <TextField
        sx={{ width: "80%" }}
        fullWidth
        type="number"
        id="standard-basic"
        label="Age"
        variant="standard"
        margin="normal"
        required
        onChange={handleChange}
        error={!!formError}
        name="age"
        value={formState.age}
      />

      <TextField
        sx={{ width: "80%" }}
        fullWidth
        select
        id="standard-basic"
        label="Gender"
        variant="standard"
        margin="normal"
        required
        onChange={handleChange}
        error={!!formError}
        name="gender"
        value={formState.gender}
      >
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="male">Male</MenuItem>
      </TextField>

      <Typography
        style={{ color: "#DB5359", marginTop: "1rem" }}
        variant="p"
        display="block"
      >
        {formError}
      </Typography>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Friend
      </Button>

      <Divider sx={{ mb: 1, mt: 2 }} />

      <IconButton
        size="large"
        aria-label="go back to friends"
        onClick={() => {
          history.goBack();
          setFormState(initialFormValues);
        }}
        color="primary"
      >
        <ArrowBackRoundedIcon />
      </IconButton>
      <Typography variant="p">Go Back</Typography>
    </Box>
  );
}
