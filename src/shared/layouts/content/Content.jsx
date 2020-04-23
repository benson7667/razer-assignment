import React from "react";
import "./styles.css";

const Content = (props) => {
  const { menuList, activeIndex } = props;

  const getSelectedProfileName = () => {
    const currentActiveItem = menuList.find((item) => item.id === activeIndex);

    if (currentActiveItem && currentActiveItem.id && currentActiveItem.name) {
      return (
        <div className="sub-title flex">
          <h1 className="eq-title">{currentActiveItem.name}</h1>
          <h1 className="eq-title">{currentActiveItem.id}</h1>
        </div>
      );
    }
    return null;
  };

  return <div className="thx-window">{getSelectedProfileName()}</div>;
};

export default Content;
