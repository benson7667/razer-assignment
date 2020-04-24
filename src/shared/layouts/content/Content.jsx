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

          <div
            style={{
              border: "1px solid green",
              padding: "10px",
              fontSize: "14px",
              userSelect: "text",
              margin: "10px 0",
              width: "400px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Basic Version</div>

            <a
              style={{ color: "white" }}
              target="_blank"
              href="https://boring-brown-c7d082.netlify.app/"
            >
              View the site
            </a>
          </div>

          <div
            style={{
              border: "1px solid green",
              padding: "10px",
              fontSize: "14px",
              userSelect: "text",
              margin: "10px 0",
              width: "400px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Upgraded Version</div>

            <a
              style={{ color: "white" }}
              target="_blank"
              href="https://practical-tesla-550e41.netlify.app/"
            >
              View the site
            </a>
          </div>

          <div
            style={{
              border: "1px solid green",
              padding: "10px",
              fontSize: "14px",
              userSelect: "text",
              margin: "10px 0",
              width: "400px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              You can also view the source code on my Github:
            </div>

            <a
              style={{ color: "white", margin: "10px 0" }}
              target="_blank"
              href="https://github.com/benson7667/razer-assignment/branches"
            >
              Go to github
            </a>
          </div>
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
