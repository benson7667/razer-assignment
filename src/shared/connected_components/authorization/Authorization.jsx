import React from "react";
import { Button } from "../../components";
import "./styles.less";

const Authorization = (props) => {
  const { isUserAuthenticated } = props;
  return (
    <div className="auth-actions">
      {!isUserAuthenticated && (
        <Button
          onClick={() => {}}
          value="LOGIN"
          className="razer-btn primary razer-fonts"
        />
      )}

      {isUserAuthenticated && (
        <div className="auth-actions__profile">
          <div className="auth-actions__profile-img" />
          <span className="auth-actions__profile-name ellipsis">Benson</span>
        </div>
      )}
    </div>
  );
};

export default Authorization;
