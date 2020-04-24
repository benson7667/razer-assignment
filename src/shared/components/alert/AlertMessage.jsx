import React, { Component } from "react";
import { bool, func, string } from "prop-types";

import { Button } from "../../components";
import "./styles.less";

class AlertMessage extends Component {
  componentDidMount() {
    if (window && typeof window !== "undefined") {
      // prevent scrolling behaviour when modal is visible
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    const body = document.querySelector("body");
    body.style.overflow = null;
  }

  handleBackDrop = (e) => {
    const { backdrop, onCancel } = this.props;
    if (!backdrop) return;
    if (e.target.className.indexOf("alert-message-layer") > -1) {
      onCancel();
    }
  };

  handleOnConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    const { title, messages, onConfirm, onCancel } = this.props;
    return (
      <div className="alert-message-layer" onClick={this.handleBackDrop}>
        <div className="alert-message-box">
          <div className="alert-message-title">{title}</div>
          <p className="alert-message-descrp">{messages}</p>

          <div className="alert-message-actions">
            {onCancel && (
              <Button
                className="razer-btn secondary"
                onClick={onCancel}
                value="Cancel"
              />
            )}

            {onConfirm && (
              <Button
                className="razer-btn danger"
                onClick={onConfirm}
                value="Delete"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

AlertMessage.propTypes = {
  title: string,
  messages: string,
  backdrop: bool,
  onConfirm: func,
  onCancel: func,
};

AlertMessage.defaultProps = {
  backdrop: true,
};

export default AlertMessage;
