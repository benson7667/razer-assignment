import React, { Component } from "react";
import { bool } from "prop-types";
import { Button, Input, Modal } from "../../components";
import RazerLogoIcon from "../../../assets/logo/razer-logo-icon.svg";
import "./styles.less";

class Authorization extends Component {
  state = {
    isAuthModalVisible: false,
  };

  renderAuthModalHeader = () => {
    return (
      <div className="auth-modal__header">
        <img
          className="auth-modal__header-logo"
          alt="razer-logo"
          src={RazerLogoIcon}
        />
        <span className="auth-modal__header-title">LOGIN</span>
        <img
          className="auth-modal__header-logo"
          alt="razer-logo"
          src={RazerLogoIcon}
        />
      </div>
    );
  };

  handleToggleAuthModal = () => {
    this.setState((prevState) => ({
      isAuthModalVisible: !prevState.isAuthModalVisible,
    }));
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("login....");
  };

  render() {
    const { isUserAuthenticated } = this.props;

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

          {isUserAuthenticated && (
            <div className="auth-actions__profile">
              <div className="auth-actions__profile-img" />
              <span className="auth-actions__profile-name ellipsis">
                Benson
              </span>
            </div>
          )}
        </div>

        {this.state.isAuthModalVisible && (
          <Modal
            title="Modal Title"
            header={this.renderAuthModalHeader()}
            footer={null}
            onCancel={this.handleToggleAuthModal}
            onConfirm={() => console.log("confirm")}
            size="small"
          >
            <form
              onSubmit={this.handleOnSubmit}
              className="auth-modal__body-form"
            >
              <Input className="razer-input" placeholder="Enter your email" />
              <Input
                className="razer-input"
                placeholder="Enter your password"
                type="password"
              />
              <div className="razer-forgot-password">Forgot Password?</div>

              <Button
                value="LOGIN"
                style={{ width: "100%" }}
                onClick={this.handleOnSubmit}
              />
            </form>

            <div className="auth-modal__body-social-provider">
              <div className="text-connect--wrap">
                <div className="horizontal-line" />
                <span className="text-connect">or connect with</span>
                <div className="horizontal-line" />
              </div>

              <div className="social-icons">
                <div className="social-icons--fb" />
                <div className="social-icons--google" />
                <div className="social-icons--twitch" />
              </div>
            </div>

            <div className="auth-modal__body-register">
              <Button
                className="razer-btn secondary"
                value="REGISTER A NEW ACCOUNT"
                style={{ width: "100%" }}
                onClick={() => console.log("register...")}
              />
            </div>
          </Modal>
        )}
      </>
    );
  }
}

Authorization.propTypes = {
  isUserAuthenticated: bool.isRequired,
};

export default Authorization;
