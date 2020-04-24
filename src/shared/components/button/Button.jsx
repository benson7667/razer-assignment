import React from "react";
import { func, string, object } from "prop-types";
import "./styles.less";

const Button = (props) => {
  const { className, styles, onClick, value } = props;
  return (
    <button className={className} styles={{ ...styles }} onClick={onClick}>
      {value}
    </button>
  );
};

Button.propTypes = {
  className: string,
  styles: object,
  value: string.isRequired,
  onClick: func.isRequired,
};

Button.defaultProps = {
  className: "razer-btn primary",
};

export default Button;
