import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import FriendsList from "./components/friends/FriendsList";

// Private Routes
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  // Needed this to initialize based on whether or not an item existed in local storage. !!string evaluates to true if the string contains a truthy value like "asdfasdf" and evaluates to false if string is empty.
  //This is assuming the user wants the page to remember if they are already logged in, so they don't have to login more than once.
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Switch>
        <PrivateRoute exact path="/friends" component={FriendsList} />

        {/* If our site had some type of landing page then this redirect would not need to exist. Note to self  */}
        <Redirect exact path="/" to="/login" />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        />
      </Switch>
    </div>
  );
}

export default App;
