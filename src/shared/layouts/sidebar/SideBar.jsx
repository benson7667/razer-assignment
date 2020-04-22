import React, { useState, useEffect } from "react";
import { func } from "prop-types";
import ActionToolbar from "./components/action_toolbar";
import MenuItem from "./components/menu_item";

import "./styles.css";

const SideBar = (props) => {
  const { activeIndex, getMenuList, setMenuActiveItem, menuList } = props;

  useEffect(() => {
    getMenuList();
  }, []);

  const handleOnClick = (clickId) => () => {
    setMenuActiveItem(clickId);
  };

  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>

      <div className="drawer-select">
        <div id="profileList" className="scrollable">
          {menuList &&
            menuList.map((menuItem) => (
              <MenuItem
                icon={menuItem.icon}
                isActive={menuItem.id === activeIndex}
                isDefault={menuItem.isDefault}
                key={menuItem.id}
                onClick={handleOnClick(menuItem.id)}
                value={menuItem.name}
              />
            ))}
        </div>

        <ActionToolbar />
      </div>
    </div>
  );
};

SideBar.propTypes = {
  getMenuList: func,
  setMenuActiveItem: func,
};

export default SideBar;
