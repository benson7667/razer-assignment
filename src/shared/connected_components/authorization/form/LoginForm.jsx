import React, { Component } from "react";
import { func } from "prop-types";

import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { Button, Input } from "../../../components";
import { isValidEmail } from "../../../../shared/utils/formValidation";
import { generateErrObj } from "../../../../shared/utils/errors";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: {},
  };

  handleOnChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value.trim(),
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const error = generateErrObj([
      {
        key: "email",
        errMsg: isEmpty(email) ? "email is required" : undefined,
      },
      {
        key: "email",
        errMsg: !isValidEmail(email) ? "wrong email format" : undefined,
      },
      {
        key: "password",
        errMsg: isEmpty(password) ? "password is required" : undefined,
      },
    ]);

    // has error
    if (!isEmpty(error)) {
      return this.setState({ error });
    }

    // no error
    this.setState({ error: {} });
    this.props.handleLogin({
      email,
      password,
    });
  };

  render() {
    const { handleSwitchForm } = this.props;
    const { email, password, error } = this.state;
    const emailErrMsg = get(error, "email.0", "");
    const passwordErrMsg = get(error, "password.0", "");

    return (
      <>
        <form onSubmit={this.handleLogin} className="auth-modal__body-form">
          <Input
            className="razer-input"
            placeholder="Enter your email"
            onChange={this.handleOnChange("email")}
            value={email}
            validateStatus={{
              error: !!emailErrMsg,
            }}
            help={emailErrMsg}
          />
          <Input
            className="razer-input"
            placeholder="Enter your password"
            type="password"
            onChange={this.handleOnChange("password")}
            value={password}
            validateStatus={{
              error: !!passwordErrMsg,
            }}
            help={passwordErrMsg}
          />
          <div className="razer-forgot-password">Forgot Password?</div>

          <Button
            value="LOGIN"
            style={{ width: "100%" }}
            onClick={this.handleLogin}
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
            onClick={handleSwitchForm}
          />
        </div>
      </>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: func.isRequired,
  handleSwitchForm: func.isRequired,
};

export default LoginForm;
