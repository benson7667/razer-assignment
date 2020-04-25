import React from "react";
import { Button } from "../../../shared/components";
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

      <div className="header-authorization">
        <Button
          onClick={() => {}}
          value="LOGIN"
          className="razer-btn primary razer-fonts"
        />
      </div>
    </div>
  );
};

export default Header;
