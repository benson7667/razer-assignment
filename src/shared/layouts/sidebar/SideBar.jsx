import React, { useState } from "react";
import "./styles.css";

const SideBar = () => {
  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>

      <div className="drawer-select">
        <div id="profileList" className="scrollable">
          <div className="profile-item active default no-edit">default</div>
          <div className="profile-item game no-edit">game</div>
          <div className="profile-item movie no-edit">movie</div>
          <div className="profile-item music no-edit">music</div>
          <div className="profile-item custom">Custom 1</div>
          <div className="profile-item custom">Custom 1</div>
          <div className="profile-item custom">Custom 1</div>
          <div className="profile-item custom">Custom 1</div>
          <div className="profile-item custom">Custom 1</div>
          <div className="profile-item custom">
            demo long text demo long text demo
          </div>
          <input
            className="profile-item"
            placeholder="Enter Profile Name"
            maxLength="25"
          />
        </div>

        <div className="toolbar">
          <div className="icon add"></div>
          <div className="icon edit"></div>
          <div className="icon delete"></div>

          <div className="icon down"></div>
          <div className="icon up disabled"></div>
        </div>
        <div id="profileDelCfm" className="profile-del alert flex">
          <div className="title">delete eq</div>
          <div className="body-text t-center" id="delName">
            delete eq
          </div>
          <div className="thx-btn" id="cfmDelete">
            delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
