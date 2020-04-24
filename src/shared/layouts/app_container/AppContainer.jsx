import React from "react";
import { any } from "prop-types";

import { AlertMessage } from "../../components";
import "./styles.less";

const AppContainer = ({ children }) => {
  return (
    <div className="app-container">
      {children}
      <AlertMessage />
    </div>
  );
};

AppContainer.propTypes = {
  children: any,
};

export default AppContainer;
