import React, { Component } from "react";
import { connect } from "react-redux";
import { fireAuth } from "../utils/firebase";
import { Actions } from "../components/authorization/actions";

class AuthStateListener extends Component {
  componentDidMount() {
    fireAuth.onAuthStateChanged(async (user) => {
      const { setUser } = this.props;

      if (user) {
        const token = await user.getIdToken();
        setUser(user, token);
      } else {
        setUser({}, "");
      }
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
});

const mapDispatchToProps = {
  setUser: Actions.SET_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthStateListener);
