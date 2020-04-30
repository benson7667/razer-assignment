import React, { Component } from "react";
import { bool, func, object } from "prop-types";
import { Button, Modal } from "..";
import { LoginForm, RegisterForm } from "./form";

import RazerLogoIcon from "../../../assets/logo/razer-logo-icon.svg";
import "./styles.less";

class Authorization extends Component {
  state = {
    isAuthModalVisible: false,
    formName: "login",
  };

  componentDidUpdate(prevProps, prevState) {
    const { isAuthModalVisible, formName } = this.state;
    const { isUserAuthenticated } = this.props;

    // user switching tab to 'register' and then close the modal, set it back to register
    if (
      prevState.isAuthModalVisible !== isAuthModalVisible &&
      !isAuthModalVisible &&
      formName === "register"
    ) {
      this.setState({
        formName: "login",
      });
    }

    // user successfully login / register
    if (
      prevProps.isUserAuthenticated !== isUserAuthenticated &&
      isUserAuthenticated
    ) {
      this.setState({ isAuthModalVisible: false });
    }
  }

  handleToggleAuthModal = () => {
    this.setState((prevState) => ({
      isAuthModalVisible: !prevState.isAuthModalVisible,
    }));
  };

  handleLogin = (value) => {
    const { email, password } = value;
    this.props.loginUser(email, password);
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  handleRegister = (value) => {
    const { email, cPassword } = value;
    this.props.registerUser(email, cPassword);
  };

  handleSwitchForm = () => {
    this.setState((prevState) => ({
      formName: prevState.formName === "login" ? "register" : "login",
    }));
  };

  renderAuthModalHeader = () => {
    const { formName } = this.state;

    return (
      <div className="auth-modal__header">
        <img
          className="auth-modal__header-logo"
          alt="razer-logo"
          src={RazerLogoIcon}
        />
        <span className="auth-modal__header-title">
          {formName.toUpperCase()}
        </span>
        <img
          className="auth-modal__header-logo"
          alt="razer-logo"
          src={RazerLogoIcon}
        />
      </div>
    );
  };

  render() {
    const {
      authError,
      isUserAuthenticated,
      isLoggingIn,
      isRegistering,
    } = this.props;
    const { isAuthModalVisible, formName } = this.state;

    return (
      <>
        <div className="auth-actions">
          {!isUserAuthenticated && (
            <Button
              onClick={this.handleToggleAuthModal}
              value="LOGIN"
              className="razer-btn primary razer-fonts"
            />
          )}

          {/* {isUserAuthenticated && (
            <div className="auth-actions__profile">
              <div className="auth-actions__profile-img" />
              <span className="auth-actions__profile-name ellipsis">
                Benson
              </span>
            </div>
          )} */}

          {isUserAuthenticated && (
            <Button
              onClick={this.handleLogout}
              value="LOGOUT"
              className="razer-btn danger razer-fonts"
            />
          )}
        </div>

        {isAuthModalVisible && (
          <Modal
            title="Modal Title"
            header={this.renderAuthModalHeader()}
            footer={null}
            onCancel={this.handleToggleAuthModal}
            onConfirm={() => console.log("confirm")}
            size="small"
          >
            {formName === "login" && (
              <LoginForm
                authError={authError}
                handleLogin={this.handleLogin}
                handleSwitchForm={this.handleSwitchForm}
                isLoggingIn={isLoggingIn}
              />
            )}

            {formName === "register" && (
              <RegisterForm
                authError={authError}
                handleRegister={this.handleRegister}
                handleSwitchForm={this.handleSwitchForm}
                isRegistering={isRegistering}
              />
            )}
          </Modal>
        )}
      </>
    );
  }
}

Authorization.propTypes = {
  authError: object,
  isUserAuthenticated: bool.isRequired,
  isLoggingIn: bool,
  isRegistering: bool,
  loginUser: func.isRequired,
  logoutUser: func.isRequired,
};

export default Authorization;
