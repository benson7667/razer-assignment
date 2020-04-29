import React from "react";
import { connect } from "react-redux";
import Authorization from "./Authorization";
import { Actions } from "./actions";

const AuthorizationContainer = (props) => <Authorization {...props} />;

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
});

const mapDispatchToProps = {
  loginUser: Actions.LOGIN_REQUEST,
  logoutUser: Actions.LOGOUT,
  registerUser: Actions.REGISTER,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorizationContainer);
