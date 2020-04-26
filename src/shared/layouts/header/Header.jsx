import React from "react";
import { Authorization } from "../../../shared/connected_components";
import "./styles.less";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-logo-wrapper">
        <img
          alt="razer-logo"
          src="https://d4kkpd69xt9l7.cloudfront.net/sys-master/images/h6c/he1/8858452525086/wordmark.svg"
        />
      </div>

      <div className="header-authorization-wrapper">
        <Authorization />
      </div>
    </div>
  );
};

export default Header;
