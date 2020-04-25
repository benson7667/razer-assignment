import React, { Component } from "react";
import cx from "classnames";
import { array, func, string } from "prop-types";

import "./styles.less";

class ActionToolbar extends Component {
  handleOnClickUp = () => {
    const { activeIndex, menuList, setMenuActiveItem } = this.props;
    const prevItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const prevItem = menuList[prevItemIndex - 1];
    if (prevItem) setMenuActiveItem(prevItem.id);
  };

  handleOnClickDown = () => {
    const { activeIndex, menuList, setMenuActiveItem } = this.props;
    const nextItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const nextItem = menuList[nextItemIndex + 1];
    if (nextItem) setMenuActiveItem(nextItem.id);
  };

  handleOnToolbarItemClick = (e) => {
    const target = e.target;
    const action = target.className.split(" ")[0];

    switch (action) {
      case "MOVE_UP": {
        if (target.className.indexOf("disabled") > -1) return;
        return this.handleOnClickUp();
      }

      case "MOVE_DOWN": {
        if (target.className.indexOf("disabled") > -1) return;
        return this.handleOnClickDown();
      }

      case "ACTION_ADD": {
        return this.props.addMenuItem();
      }

      case "ACTION_EDIT": {
        return this.props.setActiveEditing(true);
      }

      case "ACTION_DELETE": {
        const { activeIndex } = this.props;
        return this.props.triggerDelete(activeIndex);
      }

      default:
        return;
    }
  };

  isDefaultItem = () => {
    const { menuList, activeIndex } = this.props;
    const activeItem = menuList.find((item) => item.id === activeIndex);
    return activeItem && activeItem.isDefault;
  };

  render() {
    const { activeIndex, isActiveEditing, menuList } = this.props;

    return (
      <>
        <div
          className="toolbar-actions-list"
          onClick={this.handleOnToolbarItemClick}
        >
          <i
            className={cx({
              "MOVE_UP fa fa-arrow-up": true,
              "toolbar-actions-list--item": true,
              disabled:
                (menuList.length && activeIndex === menuList[0].id) ||
                isActiveEditing,
            })}
          ></i>

          <i
            className={cx({
              "MOVE_DOWN fa fa-arrow-down": true,
              "toolbar-actions-list--item": true,
              disabled:
                (menuList.length &&
                  activeIndex === menuList[menuList.length - 1].id) ||
                isActiveEditing,
            })}
          ></i>

          <i
            className={cx({
              "ACTION_EDIT fa fa-pencil": true,
              "toolbar-actions-list--item": true,
              disabled: this.isDefaultItem() || isActiveEditing,
            })}
          ></i>

          <i
            className={cx({
              "ACTION_DELETE fa fa-trash": true,
              "toolbar-actions-list--item": true,
              disabled: this.isDefaultItem() || isActiveEditing,
            })}
          ></i>

          <i
            className={cx({
              "ACTION_ADD fa fa-plus": true,
              "toolbar-actions-list--item": true,
              disabled: isActiveEditing,
            })}
          ></i>
        </div>
      </>
    );
  }
}

ActionToolbar.propTypes = {
  activeIndex: string,
  menuList: array,
  setMenuActiveItem: func,
  triggerDelete: func,
};

export default ActionToolbar;
