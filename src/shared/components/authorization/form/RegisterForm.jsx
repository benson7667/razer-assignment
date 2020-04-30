import React, { Component } from "react";
import { any, bool, func, obj } from "prop-types";

import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import get from "lodash/get";

import { Button, Input } from "../..";
import { generateErrObj, getFirebaseAuthErr } from "../../../utils/errors";
import { isValidEmail } from "../../../utils/formValidation";

class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    cPassword: "",
    error: {}, // err for validation
    registerErr: {}, // err from firebase
  };

  componentDidUpdate(prevProps) {
    const { authError, isRegistering } = this.props;
    // set authError to a local state, when register failed
    if (
      prevProps.isRegistering !== isRegistering &&
      !isRegistering &&
      !isEmpty(authError)
    ) {
      this.setState({ registerErr: authError });
    }
  }

  handleOnChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value.trim(),
    });
  };

  handleRegister = () => {
    const { email, password, cPassword } = this.state;

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
      {
        key: "cPassword",
        errMsg: isEmpty(password) ? "confirm your password" : undefined,
      },
      {
        key: "cPassword",
        errMsg: !isEqual(password, cPassword)
          ? "password not matched"
          : undefined,
      },
    ]);

    // has error
    if (!isEmpty(error)) {
      return this.setState({ error });
    }

    // no error
    this.setState({ error: {} });
    this.props.handleRegister({
      email,
      password,
      cPassword,
    });
  };

  render() {
    const { handleSwitchForm, isRegistering } = this.props;
    const { email, password, cPassword, error, registerErr } = this.state;

    const firebaseAuthErr = getFirebaseAuthErr(registerErr);
    const emailErrMsg = get(error, "email.0", "");
    const passwordErrMsg = get(error, "password.0", "");
    const cPasswordErrMsg = get(error, "cPassword.0", "");

    return (
      <>
        <form onSubmit={this.handleRegister} className="auth-modal__body-form">
          <Input
            className="razer-input"
            placeholder="Enter your email"
            onChange={this.handleOnChange("email")}
            validateStatus={{
              error: !!emailErrMsg || !!firebaseAuthErr,
            }}
            value={email}
            help={emailErrMsg}
          />
          <Input
            className="razer-input"
            placeholder="Enter your password"
            onChange={this.handleOnChange("password")}
            type="password"
            validateStatus={{
              error: !!emailErrMsg || firebaseAuthErr,
            }}
            value={password}
            help={passwordErrMsg}
          />
          <Input
            className="razer-input"
            placeholder="Confirm your password"
            onChange={this.handleOnChange("cPassword")}
            type="password"
            validateStatus={{
              error: !!emailErrMsg || !!firebaseAuthErr,
            }}
            value={cPassword}
            help={cPasswordErrMsg}
          />
        </form>

        <div className="auth-modal__body-register">
          <span className="auth-error">{firebaseAuthErr}</span>
          <Button
            value="TEST REGISTER"
            style={{ width: "100%" }}
            onClick={this.handleRegister}
            isLoading={isRegistering}
          />
          <Button
            className="razer-btn secondary"
            value="BACK TO LOGIN"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={handleSwitchForm}
          />
        </div>
      </>
    );
  }
}

RegisterForm.propTypes = {
  authError: any,
  handleSwitchForm: func.isRequired,
  handleRegister: func.isRequired,
  isRegistering: bool,
};

export default RegisterForm;
