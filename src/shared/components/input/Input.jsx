import React from "react";
import { func, bool, number, object, string } from "prop-types";
import "./styles.less";

const Input = (props) => {
  const {
    autoFocus,
    className,
    onChange,
    onFocus,
    maxLength,
    placeholder,
    style,
    type,
    value,
  } = props;

  return (
    <input
      autoFocus={autoFocus}
      className={className}
      maxLength={maxLength}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      style={{ ...style }}
      type={type}
      value={value}
    />
  );
};

Input.propTypes = {
  autoFocus: bool,
  className: string,
  onChange: func,
  onFocus: func,
  maxLength: number,
  placeholder: string,
  style: object,
  value: string,
};

Input.defaultProps = {
  autoFocus: false,
};

export default Input;
