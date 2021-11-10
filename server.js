const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const app = express();
const token =
  "esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ";

let friends = [
  {
    id: 1,
    name: "Rachel Green",
    age: 30,
    email: "rachel@friends.com",
    imageUrl: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 2,
    name: "Joey Tribbiani",
    age: 34,
    email: "joey@friends.com",
    imageUrl: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 3,
    name: "Chandler Bing",
    age: 32,
    email: "chandler@friends.com",
    imageUrl: "https://i.pravatar.cc/150?img=57",
  },
  {
    id: 4,
    name: "Ross Geller",
    age: 32,
    email: "ross@friends.com",

    imageUrl: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 5,
    name: "Monica Bing",
    age: 31,
    email: "monica@friends.com",
    imageUrl: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 6,
    name: "Phoebe Buffay-Hannigan",
    age: 30,
    email: "phoebe@friends.com",
    imageUrl: "https://i.pravatar.cc/150?img=24",
  },
];

app.use(bodyParser.json());

app.use(cors());

let nextId = 7;

function getNextId() {
  return nextId++;
}

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // I think email is more aesthetic on a login page then a username. I also find myself forgetting various usernames much much more than my main email.
  if (email === "lambda@gmail.com" && password === "school") {
    req.loggedIn = true;
    res.status(200).json({
      payload: token,
    });
  } else {
    res.status(403).json({ error: "Username or Password Incorrect" });
  }
});

app.post("/api/logout", authenticator, (req, res) => {
  req.loggedIn = false;
  res.status(200).json({
    payload: token,
  });
});

app.get("/api/friends", authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get("/api/friends/:id", authenticator, (req, res) => {
  const friend = friends.find((f) => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: "Friend not found" });
  }
});

app.post("/api/friends", authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.get("/api/", (req, res) => {
  res.status(200).json({ status: "served" });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
