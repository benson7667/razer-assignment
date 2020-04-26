import React from "react";
import { connect } from "react-redux";
import Authorization from "./Authorization";

const AuthorizationContainer = (props) => <Authorization {...props} />;

const mapStateToProps = (state) => ({
  isUserAuthenticated: false,
});

export default connect(mapStateToProps, null)(AuthorizationContainer);
