import React, { Component } from "react";
import { connect } from "react-redux";
import { fireAuthStateChanged, fireAuth } from "../utils/firebase";
import storage, {
  RAZER_JWT_TOKEN,
  RAZER_USER_INFO,
} from "../../shared/utils/storage";
import { Actions } from "../components/authorization/actions";

class AuthStateListener extends Component {
  componentDidMount() {
    const { isUserAuthenticated, setUserAuthenticate } = this.props;

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
