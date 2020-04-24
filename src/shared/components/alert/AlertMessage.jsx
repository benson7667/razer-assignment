import React from "react";
import "./styles.less";

const AlertMessage = (props) => {
  const {} = props;
  return (
    <div className="alert-message-layer">
      <div className="alert-message-box">
        <h5>Delete Profile</h5>
        <p>Are you sure want to delete ......</p>
        <button>asdasd</button>
      </div>
    </div>
  );
};

export default AlertMessage;
