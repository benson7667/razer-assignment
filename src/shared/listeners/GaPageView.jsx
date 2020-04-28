import React, { Component } from "react";
import { initGa, logPageView } from "../utils/googleAnalytics";

class GaPageView extends Component {
  componentDidMount() {
    logPageView({
      pathname: window.location.pathname,
      title: "Home",
    });
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default GaPageView;
