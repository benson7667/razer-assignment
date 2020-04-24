import React, { Component } from "react";
import { string } from "prop-types";
import { connect } from "react-redux";

import { Button } from "../../components";
import "./styles.less";

class AlertMessage extends Component {
  handleBackDrop = (e) => {
    if (e.target.className.indexOf("alert-message-laye")) {
      // this.props.onClose();
    }
  };

  handleOnConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    const { title, messages, onConfirm } = this.props;
    return (
      <div className="alert-message-layer" onClick={this.handleBackDrop}>
        <div className="alert-message-box">
          <div className="alert-message-title">{title}</div>
          <p>{messages}</p>
          {/* <Button
            className="razer-btn delete"
            onClick={onConfirm}
            value="Delete"
          /> */}
          <button onClick={this.handleOnConfirm}>delete</button>
        </div>
      </div>
    );
  }
}

AlertMessage.propTypes = {
  title: string,
  messages: string,
};

const mapStateToProps = (state) => ({
  title: state.systems.alert.title,
  onConfirm: state.systems.alert.onConfirm,
});

export default connect(mapStateToProps, null)(AlertMessage);
