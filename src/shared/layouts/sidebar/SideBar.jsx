import React, { useState, useEffect } from "react";
import cx from "classnames";

import ActionToolbar from "./components/action_toolbar";
import MenuItem from "./components/menu_item";

import "./styles.css";

export const menuList = [
  {
    id: 1,
    name: "Default",
    icon: "default",
    isDefault: true,
  },
  {
    id: 2,
    name: "Music",
    icon: "music",
    isDefault: true,
  },
  {
    id: 3,
    name: "Movie",
    icon: "movie",
    isDefault: true,
  },
  {
    id: 4,
    name: "Game",
    icon: "game",
    isDefault: true,
  },
  {
    id: 5,
    name: "Custom1",
    icon: "custom",
  },
  {
    id: 6,
    name: "demo long text demo long text demo",
    icon: "custom",
  },
];

const SideBar = () => {
  const [sideBarList, setSideBarList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    setSideBarList(menuList);
  }, []);

  const handleOnClick = (clickId) => () => {
    setActiveIndex(clickId);
  };

  const handleOnClickUp = () => {
    const prevItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const prevItem = menuList[prevItemIndex - 1];
    if (prevItem) {
      setActiveIndex(prevItem.id);
    }
  };

  const handleOnClickDown = () => {
    const nextItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const nextItem = menuList[nextItemIndex + 1];
    if (nextItem) {
      setActiveIndex(nextItem.id);
    }
  };

  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>

      <div className="drawer-select">
        <div id="profileList" className="scrollable">
          {sideBarList &&
            sideBarList.map((menuItem) => (
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

        <ActionToolbar
          activeIndex={activeIndex}
          onClickDown={handleOnClickDown}
          onClickUp={handleOnClickUp}
        />
      </div>
    </div>
  );
};

export default SideBar;
