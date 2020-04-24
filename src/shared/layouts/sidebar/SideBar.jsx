import React, { Component } from "react";
import { func } from "prop-types";
import { FiHome } from "react-icons/fi";

import ActionToolbar from "./components/action_toolbar";
import MenuList from "./components/menu_list";

import "./styles.css";

class SideBar extends Component {
  componentDidMount() {
    this.props.getMenuList();
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-title">Profile List</div>

        <ul className="sidebar-menu-list">
          <li className="sidebar-menu-list-item">
            <FiHome className="mr12" color="#44d62c" />
            <span>Default</span>
          </li>
          <li className="sidebar-menu-list-item">
            <FiHome className="mr12" color="#44d62c" />
            <span>Game</span>
          </li>
          <li className="sidebar-menu-list-item">
            <FiHome className="mr12" color="#44d62c" />
            <span>Music</span>
          </li>
        </ul>

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
