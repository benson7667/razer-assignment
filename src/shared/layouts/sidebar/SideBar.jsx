import React from "react";
import "./styles.css";

const SideBar = () => {
  return (
    <div class="thx-drawer flex">
      <div class="main-title">Profile List</div>

      <div class="drawer-select">
        <div id="profileList" class="scrollable">
          <div class="profile-item active default no-edit">default</div>
          <div class="profile-item game no-edit">game</div>
          <div class="profile-item movie no-edit">movie</div>
          <div class="profile-item music no-edit">music</div>
          <div class="profile-item custom">Custom 1</div>
          <div class="profile-item custom">Custom 1</div>
          <div class="profile-item custom">Custom 1</div>
          <div class="profile-item custom">Custom 1</div>
          <div class="profile-item custom">Custom 1</div>
          <div class="profile-item custom">
            demo long text demo long text demo
          </div>
          <input
            class="profile-item"
            placeholder="Enter Profile Name"
            maxlength="25"
          />
        </div>

        <div class="toolbar">
          <div class="icon add"></div>
          <div class="icon edit"></div>
          <div class="icon delete"></div>

          <div class="icon down"></div>
          <div class="icon up disabled"></div>
        </div>
        <div id="profileDelCfm" class="profile-del alert flex">
          <div class="title">delete eq</div>
          <div class="body-text t-center" id="delName">
            delete eq
          </div>
          <div class="thx-btn" id="cfmDelete">
            delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
