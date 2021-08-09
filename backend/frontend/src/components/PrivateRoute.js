import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

export default function PrivateRoute({ renderFunc, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return user ? renderFunc() : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

PrivateRoute.propTypes = {
  renderFunc: PropTypes.func,
};
