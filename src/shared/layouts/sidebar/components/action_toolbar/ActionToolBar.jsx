import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import { array, func, string } from "prop-types";
import { useListenOutsideClick } from "../../../../custom_hooks/layout";

const ActionToolbar = (props) => {
  const [isAlertDeleteVisible, setisAlertDeleteVisible] = useState(false);

  const deleteAlertRef = useRef();
  //   const isUserClickedOutside = useListenOutsideClick(deleteAlertRef);

  const {
    activeIndex,
    addMenuItem,
    menuList,
    removeMenuItem,
    setMenuActiveItem,
  } = props;

  useEffect(() => {
    setisAlertDeleteVisible(false);
  }, [menuList]);

  const handleOnToolbarItemClick = (activeIndex) => (e) => {
    const target = e.target;

    switch (target.id) {
      case "add": {
        return addMenuItem();
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
        return handleOnClickUp();
      }

      case "down": {
        if (target.className.indexOf("disabled") > -1) return;
        return handleOnClickDown();
      }

      default:
        return;
    }
  };

  const handleMenuDelete = () => {
    removeMenuItem(activeIndex);
  };

  const handleOnClickUp = () => {
    const prevItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const prevItem = menuList[prevItemIndex - 1];
    if (prevItem) {
      setMenuActiveItem(prevItem.id);
    }
  };

  const handleOnClickDown = () => {
    const nextItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const nextItem = menuList[nextItemIndex + 1];
    if (nextItem) {
      setMenuActiveItem(nextItem.id);
    }
  };

  const isDefaultItem = () => {
    const activeItem = menuList.find((item) => item.id === activeIndex);
    return activeItem && activeItem.isDefault;
  };

  return (
    <>
      <div className="toolbar" onClick={handleOnToolbarItemClick(activeIndex)}>
        <div id="add" className="icon add"></div>
        {!isDefaultItem() && <div id="edit" className="icon edit"></div>}
        {!isDefaultItem() && <div id="delete" className="icon delete"></div>}

        <div
          id="up"
          className={cx({
            "icon up": true,
            disabled: menuList.length && activeIndex === menuList[0].id,
          })}
        />

        <div
          id="down"
          className={cx({
            "icon down": true,
            disabled:
              menuList.length &&
              activeIndex === menuList[menuList.length - 1].id,
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
        <div className="title">Confirm Delete?</div>
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
  activeIndex: string,
  menuList: array,
  setMenuActiveItem: func,
};

export default ActionToolbar;
