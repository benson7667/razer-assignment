import React, { Component } from "react";
import { func, string, any } from "prop-types";

import { Button } from "../../components";
import "./styles.less";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.backDropRef = React.createRef();
  }

  componentDidMount() {
    if (window && typeof window !== "undefined") {
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    const body = document.querySelector("body");
    body.style.overflow = null;
  }

  handleBackDropClick = (e) => {
    const { backdrop, onCancel } = this.props;
    if (!backdrop) return;
    if (e.target === this.backDropRef.current) {
      onCancel();
    }
  };

  handleOnConfirm = () => {
    this.props.onConfirm();
  };

  renderHeader = () => {
    const { header, title, onCancel } = this.props;

    if (header) return header;

    return (
      <div className="razer-modal__header">
        <div className="modal-title">{title}</div>
        <i className="fa fa-times modal-close" onClick={onCancel}></i>
      </div>
    );
  };

  renderFooter = () => {
    const { footer, onCancel } = this.props;

    if (footer) return footer;
    if (footer === null) return null;

    return (
      <div className="razer-modal__footer">
        <Button
          className="razer-btn secondary"
          value="Cancel"
          style={{ marginRight: "10px" }}
          onClick={onCancel}
        />
        <Button
          className="razer-btn primary"
          value="Confirm"
          onClick={this.handleOnConfirm}
        />
      </div>
    );
  };

  render() {
    const { children, size } = this.props;

    return (
      <div
        className="razer-modal"
        ref={this.backDropRef}
        onClick={this.handleBackDropClick}
      >
        <div className={`razer-modal-wrapper ${size}`}>
          {this.renderHeader()}

          <div className="razer-modal__body">{children}</div>

          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: any,
  header: any,
  footer: any,
  onClick: func,
  onConfirm: func,
  size: string,
  title: string,
};

Modal.defaultProps = {
  backdrop: true,
  size: "medium",
};

export default Modal;
