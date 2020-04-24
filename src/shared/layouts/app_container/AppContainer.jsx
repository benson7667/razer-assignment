import React from "react";
import { connect } from "react-redux";
import { any } from "prop-types";
import { AlertMessage } from "../../components";
import "./styles.less";

const AppContainer = (props) => {
  const { children, isAlertVisible } = props;

  return (
    <div className="app-container">
      {children}

      {isAlertVisible && <AlertMessage />}
    </div>
  );
};

AppContainer.propTypes = {
  children: any,
};

const mapStateToProps = (state) => ({
  isAlertVisible: state.systems.alert.isVisible,
});

export default connect(mapStateToProps, null)(AppContainer);
