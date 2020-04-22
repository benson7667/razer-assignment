import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import PropTypes, { func } from "prop-types";
import { useListenOutsideClick } from "../../../../custom_hooks/layout";
import { menuList } from "../../SideBar";

const ActionToolbar = (props) => {
  const [isAlertDeleteVisible, setisAlertDeleteVisible] = useState(false);

  const deleteAlertRef = useRef();
  //   const isUserClickedOutside = useListenOutsideClick(deleteAlertRef);

  const { activeIndex, onClickUp, onClickDown } = props;

  const handleOnToolbarItemClick = (activeIndex) => (e) => {
    const target = e.target;

    switch (target.id) {
      case "add": {
        return;
      }

      case "edit": {
        console.log("Editing index", activeIndex);
        return;
      }

      case "delete": {
        return setisAlertDeleteVisible(!isAlertDeleteVisible);
      }

      case "up": {
        if (target.className.indexOf("disabled") > -1) return;
        return onClickUp();
      }

      case "down": {
        if (target.className.indexOf("disabled") > -1) return;
        return onClickDown();
      }

      default:
        return;
    }
  };

  const handleMenuDelete = () => {
    console.log(activeIndex);
  };

  return (
    <>
      <div className="toolbar" onClick={handleOnToolbarItemClick(activeIndex)}>
        <div id="add" className="icon add"></div>
        <div id="edit" className="icon edit"></div>
        <div id="delete" className="icon delete"></div>

        <div
          id="up"
          className={cx({
            "icon up": true,
            disabled: activeIndex === menuList[0].id,
          })}
        />

        <div
          id="down"
          className={cx({
            "icon down": true,
            disabled: activeIndex === menuList[menuList.length - 1].id,
          })}
        />
      </div>

      <div
        className={cx({
          "profile-del alert flex": true,
          show: isAlertDeleteVisible,
        })}
        ref={deleteAlertRef}
      >
        <div className="title">{`delete eq ${activeIndex}`}</div>
        <div className="body-text t-center">
          {`Are you sure want to delete ${activeIndex} ?`}
        </div>
        <div onClick={handleMenuDelete} className="thx-btn">
          delete
        </div>
      </div>
    </>
  );
};

ActionToolbar.propTypes = {
  onClickDown: func.isRequired,
  onClickUp: func.isRequired,
};

export default ActionToolbar;
