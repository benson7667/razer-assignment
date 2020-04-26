import React from "react";
import { array, bool, string, number } from "prop-types";
import { MainTitle, Jumbotron } from "../../../shared/components";

import "./styles.less";

const Content = (props) => {
  const {
    activeIndex,
    activeName,
    autoSaveCount,
    isAutoSaving,
    menuList,
  } = props;

  const getSelectedProfileName = () => {
    const currentActiveItem = menuList.find((item) => item.id === activeIndex);

    if (currentActiveItem && currentActiveItem.id && currentActiveItem.name) {
      return (
        <div>
          <h1>{`AutoSaveCount: ${autoSaveCount}`}</h1>
          {isAutoSaving && (
            <h1>
              Auto Saving... Please wait a while, jsonplaceholder apis freaking
              slow
            </h1>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-content-wrapper">
      <Jumbotron />

      <MainTitle title={activeName} subtitle={`Profile ID: ${activeIndex}`}>
        {getSelectedProfileName()}
      </MainTitle>
    </div>
  );
};

Content.propTypes = {
  activeIndex: string,
  autoSaveCount: number,
  isAutoSaving: bool,
  menuList: array,
};

export default Content;
