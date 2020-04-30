import React from "react";
import { bool, func, string, object } from "prop-types";
import DotLoader from "../dot_loader/DotLoader";
import "./styles.less";

const Button = (props) => {
  const { className, disabled, style, isLoading, onClick, value } = props;
  return (
    <button
      disabled={disabled || isLoading}
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      {isLoading ? <DotLoader color="#44d62c" /> : value}
    </button>
  );
};

Button.propTypes = {
  className: string,
  style: object,
  value: string.isRequired,
  onClick: func.isRequired,
  isLoading: bool,
};

Button.defaultProps = {
  className: "razer-btn primary",
};

export default Button;
