import React, { Component } from "react";
import { array, func } from "prop-types";
import cx from "classnames";

import find from "lodash/find";
import get from "lodash/get";

import { AlertDialog } from "../../../shared/components";
import ActionToolbar from "./components/action_toolbar";
import { sideBarIcon } from "../../../constants";

import "./styles.less";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToDelete: "",
      isAlertVisible: false,
    };
  }

  componentDidMount() {
    this.props.getMenuList();
  }

  componentDidUpdate(prevProps) {
    const { menuList } = this.props;

    // successfully delete an item
    if (menuList.length < prevProps.menuList.length) {
      this.setState({
        isAlertVisible: false,
        idToDelete: "",
      });
    }
  }

  handleMenuItemClick = (id) => () => {
    const { isActiveEditing, setMenuActiveItem } = this.props;
    return isActiveEditing ? this.unfocusAndSave() : setMenuActiveItem(id);
  };

  // close the input field and save the value
  unfocusAndSave = () => {
    const { activeIndex, setActiveEditing, updateMenuItem } = this.props;
    const { inputValue } = this.state;
    setActiveEditing(false);
    updateMenuItem({
      id: activeIndex,
      value: inputValue,
    });
    this.setState({ inputValue: "" });
  };

  handleToolbarDeleteRequest = (id) => {
    this.setState({
      idToDelete: id,
      isAlertVisible: true,
    });
  };

  handleMenuHoverDeleteRequest = (id) => (e) => {
    e.stopPropagation();
    this.setState({
      idToDelete: id,
      isAlertVisible: true,
    });
  };

  generateAlertMessage = () => {
    const { menuList } = this.props;
    const { idToDelete } = this.state;
    const deleteItem = find(menuList, { id: idToDelete });
    const name = get(deleteItem, "name", "");
    return `Are you sure want to delete ${name} ?`;
  };

  handleConfirmDelete = () => {
    const { idToDelete } = this.state;
    const { removeMenuItem } = this.props;
    removeMenuItem(idToDelete);
  };

  handleCancelDelete = () => {
    this.setState({ isAlertVisible: false });
  };

  render() {
    const { activeIndex, menuList, isActiveEditing } = this.props;

    console.log(this.state.idToDelete);

    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-title">Profile List</div>

        <ul className="sidebar-menu-list">
          {menuList.length &&
            menuList.map((menuItem) => {
              const { id, name, isDefault } = menuItem;

              const lowCaseName = name.toLowerCase();
              const icon = sideBarIcon[lowCaseName]
                ? sideBarIcon[lowCaseName]
                : sideBarIcon["custom"];

              return (
                <li
                  key={id}
                  className={cx({
                    "sidebar-menu-list-item": true,
                    active: id === activeIndex,
                  })}
                  onClick={this.handleMenuItemClick(id)}
                >
                  <i
                    className={cx({
                      "menu-icon": true,
                      [icon]: true,
                    })}
                  ></i>

                  <span className="menu-name">{name}</span>

                  {!isDefault && (
                    <i
                      onClick={this.handleMenuHoverDeleteRequest(id)}
                      className="fa fa-times delete-icon"
                    ></i>
                  )}
                </li>
              );
            })}
        </ul>

        <ActionToolbar triggerDelete={this.handleToolbarDeleteRequest} />

        {this.state.idToDelete && this.state.isAlertVisible && (
          <AlertDialog
            title="Delete Profile"
            messages={this.generateAlertMessage()}
            onConfirm={this.handleConfirmDelete}
            onCancel={this.handleCancelDelete}
          />
        )}
      </div>
    );
  }
}

SideBar.propTypes = {
  getMenuList: func,
  removeMenuItem: func,
  menuList: array,
};

export default SideBar;
