import React from "react";
import { bool, func, string } from "prop-types";
import cx from "classnames";

const MenuItem = (props) => {
  const { isActive, isDefault, icon, onClick, value } = props;

  return (
    <>
      <div
        className={cx({
          active: isActive,
          "profile-item": true,
          [icon]: true,
          "no-edit": isDefault,
        })}
        onClick={onClick}
      >
        {value}
      </div>

      <input
        className="profile-item"
        placeholder="Enter Profile Name"
        maxLength="25"
      />
    </>
  );
};

MenuItem.propTypes = {
  value: string.isRequired,
  icon: string.isRequired,
  isDefault: bool,
  isActive: bool,
  onClick: func.isRequired,
};

MenuItem.defaultProps = {
  isDefault: false,
  isActive: false,
};

export default MenuItem;
