import React from "react";
import { connect } from "react-redux";
import Authorization from "./Authorization";
import { Actions } from "./actions";

const AuthorizationContainer = (props) => <Authorization {...props} />;

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
  isLoggingIn: state.user.isLoggingIn,
  isRegistering: state.user.isRegistering,
  authError: state.user.authError,
});

const mapDispatchToProps = {
  loginUser: Actions.LOGIN_REQUEST,
  logoutUser: Actions.LOGOUT,
  registerUser: Actions.REGISTER_REQUEST,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorizationContainer);
