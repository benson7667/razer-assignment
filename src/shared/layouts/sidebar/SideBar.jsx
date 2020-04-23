import React, { Component } from "react";
import { func } from "prop-types";

import ActionToolbar from "./components/action_toolbar";
import MenuList from "./components/menu_list";

import "./styles.css";

class SideBar extends Component {
  componentDidMount() {
    this.props.getMenuList();
  }

  render() {
    return (
      <div className="thx-drawer flex">
        <div className="main-title">Profile List</div>

        <div className="drawer-select">
          <MenuList />
          <ActionToolbar />
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  getMenuList: func,
};

export default SideBar;
