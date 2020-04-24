import React from "react";
import { array, bool, string, number } from "prop-types";
import "./styles.css";

const Content = (props) => {
  const { activeIndex, autoSaveCount, isAutoSaving, menuList } = props;

  const getSelectedProfileName = () => {
    const currentActiveItem = menuList.find((item) => item.id === activeIndex);

    if (currentActiveItem && currentActiveItem.id && currentActiveItem.name) {
      return (
        <div className="sub-title flex">
          <h1 className="eq-title">{`Profile Name: ${currentActiveItem.name}`}</h1>
          <h1 className="eq-title">{`Profile ID: ${currentActiveItem.id}`}</h1>
          <h1 className="eq-title">{`AutoSaveCount: ${autoSaveCount}`}</h1>

          {isAutoSaving && (
            <h1 className="eq-title">
              Auto Saving... Please wait a while, jsonplaceholder apis freaking
              slow
            </h1>
          )}

          <p>Here is another Upgraded Version</p>
          <p>You can also check source code through the Github Url:</p>
        </div>
      );
    }
    return null;
  };

  return <div className="thx-window">{getSelectedProfileName()}</div>;
};

Content.propTypes = {
  activeIndex: string,
  autoSaveCount: number,
  isAutoSaving: bool,
  menuList: array,
};

export default Content;
