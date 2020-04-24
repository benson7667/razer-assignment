import React, { Component } from "react";
import { func } from "prop-types";
import cx from "classnames";
import { FiPlus, FiEdit2, FiX, FiArrowUp, FiArrowDown } from "react-icons/fi";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";

import ActionToolbar from "./components/action_toolbar";
import MenuList from "./components/menu_list";

import "./styles.less";

class SideBar extends Component {
  componentDidMount() {
    this.props.getMenuList();
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

  render() {
    const { activeIndex, menuList, isActiveEditing } = this.props;

    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-title">Profile List</div>

        <ul className="sidebar-menu-list">
          {menuList.length &&
            menuList.map((menuItem) => {
              const { id, name, isDefault } = menuItem;
              return (
                <li
                  className={cx({
                    "sidebar-menu-list-item": true,
                    active: id === activeIndex,
                  })}
                  onClick={this.handleMenuItemClick(id)}
                >
                  <span className="flex1">{name}</span>
                  <FiX />
                </li>
              );
            })}
        </ul>

        <ActionToolbar />

        {/* <div className="toolbar-wrapper">
          <div className="toolbar-actions-list">
            <AiOutlineArrowUp className="toolbar-actions-list--item" />
            <AiOutlineArrowDown className="toolbar-actions-list--item" />
            <AiOutlineEdit className="toolbar-actions-list--item" />
            <AiOutlineDelete className="toolbar-actions-list--item" />
            <AiOutlinePlus className="toolbar-actions-list--item" />
          </div>
        </div> */}

        {/* <div className="drawer-select">
          <MenuList />
          <ActionToolbar />
        </div> */}
      </div>
    );
  }
}

SideBar.propTypes = {
  getMenuList: func,
};

export default SideBar;
