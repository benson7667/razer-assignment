import React, { Component } from "react";
import cx from "classnames";
import { array, func, string } from "prop-types";

import find from "lodash/find";
import get from "lodash/get";

import "./styles.less";

class ActionToolbar extends Component {
  constructor(props) {
    super(props);
    this.deleteBoxRef = React.createRef();
    this.state = {
      isDeleteAlertBoxVisible: false,
    };
  }

  // componentDidMount() {
  //   if (window && typeof window !== "undefined") {
  //     window.addEventListener("click", this.handleListenClick);
  //   }
  // }

  // componentWillUnmount() {
  //   window.addEventListener("click", this.handleListenClick);
  // }

  componentDidUpdate(prevProps) {
    const { menuList } = this.props;
    // hide delete alert box when successfully delete an item
    if (menuList.length < prevProps.menuList.length) {
      this.setState({
        isDeleteAlertBoxVisible: false,
      });
    }
  }

  handleListenClick = (e) => {
    // user is clicking within the alert box, do nothing
    if (this.deleteBoxRef && this.deleteBoxRef.current.contains(e.target))
      return;

    // user is clicking the delete button, do nothing
    if (e.target.className.indexOf("delete") > -1) return;

    this.setState({ isDeleteAlertBoxVisible: false });
  };

  isDefaultItem = () => {
    const { menuList, activeIndex } = this.props;
    const activeItem = menuList.find((item) => item.id === activeIndex);
    return activeItem && activeItem.isDefault;
  };

  handleMenuDelete = () => {
    const { activeIndex, removeMenuItem } = this.props;
    removeMenuItem(activeIndex);
  };

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

  handleOnToolbarItemClick = (activeIndex) => (e) => {
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
        return this.setState((prevState) => ({
          isDeleteAlertBoxVisible: !prevState.isDeleteAlertBoxVisible,
        }));
      }

      default:
        return;
    }
  };

  handleArrowDown = (e) => {
    console.log("svg", e.target.className);
  };

  getDeleteItemName = () => {
    const { activeIndex, menuList } = this.props;
    const deleteItem = find(menuList, { id: activeIndex });
    return get(deleteItem, "name", "");
  };

  render() {
    const { activeIndex, menuList } = this.props;
    const { isDeleteAlertBoxVisible } = this.state;

    return (
      <>
        <div
          className="toolbar-wrapper"
          onClick={this.handleOnToolbarItemClick(activeIndex)}
        >
          <div className="toolbar-actions-list">
            <i
              className={cx({
                "MOVE_UP fa fa-arrow-up": true,
                "toolbar-actions-list--item": true,
                disabled: menuList.length && activeIndex === menuList[0].id,
              })}
            ></i>

            <i
              className={cx({
                "MOVE_DOWN fa fa-arrow-down": true,
                "toolbar-actions-list--item": true,
                disabled:
                  menuList.length &&
                  activeIndex === menuList[menuList.length - 1].id,
              })}
            ></i>

            <i
              className={cx({
                "ACTION_EDIT fa fa-pencil": true,
                "toolbar-actions-list--item": true,
                disabled: this.isDefaultItem(),
              })}
            ></i>

            <i
              className={cx({
                "ACTION_DELETE fa fa-trash": true,
                "toolbar-actions-list--item": true,
                disabled: this.isDefaultItem(),
              })}
            ></i>
          </div>
        </div>

        {/* <div
          className="toolbar"
          onClick={this.handleOnToolbarItemClick(activeIndex)}
        >
          <div id="add" className="icon add"></div>
          {!this.isDefaultItem() && <div id="edit" className="icon edit"></div>}
          {!this.isDefaultItem() && (
            <div id="delete" className="icon delete"></div>
          )}

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
          ref={this.deleteBoxRef}
          className={cx({
            "profile-del alert flex": true,
            show: isDeleteAlertBoxVisible,
          })}
        >
          <div className="title">Delete Eq?</div>
          <div className="body-text t-center">{this.getDeleteItemName()}</div>
          <div onClick={this.handleMenuDelete} className="thx-btn">
            delete
          </div>
        </div> */}
      </>
    );
  }
}

ActionToolbar.propTypes = {
  activeIndex: string,
  menuList: array,
  setMenuActiveItem: func,
};

export default ActionToolbar;
