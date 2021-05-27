import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{
              pathname: "/giris",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn
  };
};

export default connect(mapStateToProps)(ProtectedRoute);