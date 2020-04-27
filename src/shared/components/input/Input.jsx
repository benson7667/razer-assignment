import React from "react";
import cx from "classnames";
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
    validateStatus,
    help,
  } = props;

  return (
    <div className="razer-input-wrapper">
      <input
        autoFocus={autoFocus}
        className={cx({
          [className]: true,
          error: validateStatus && validateStatus.error,
          // TODO: can add warning, success by checking validateStatus.xxx
        })}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        style={{ ...style }}
        type={type}
        value={value}
      />

      {help && <span className="razer-input--help">{help}</span>}
    </div>
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
  validateStatus: object,
  help: string,
};

Input.defaultProps = {
  autoFocus: false,
};

export default Input;
