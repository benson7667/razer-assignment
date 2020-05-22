import React, { Component } from "react";
import config from "../../config";
import { fireMessaging } from "../utils/firebase";

class FcmListener extends Component {
  componentDidMount() {
    fireMessaging.usePublicVapidKey(config.firebase.webPushCertificates);
    fireMessaging
      .getToken()
      .then((registration) => {
        if (registration) {
          console.log("registration token", registration);
        } else {
          console.log("asking for permission....");
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default FcmListener;
