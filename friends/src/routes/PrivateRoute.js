import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  if (localStorage.getItem("token")) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect exact to="/login" />;
  }
}
