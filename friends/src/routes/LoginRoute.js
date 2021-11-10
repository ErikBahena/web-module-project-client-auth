import React from "react";
import { Route, Redirect } from "react-router-dom";

// If a person is already logged in, then I want then to not be able to log in again, so I'm routing them to the friends path, which will make sure they have the token and render the appropriate component

export default function PrivateRoute({ component: Component, ...rest }) {
  if (!localStorage.getItem("token")) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect exact to="/friends" />;
  }
}
