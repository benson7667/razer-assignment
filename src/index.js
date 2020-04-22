import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/fonts/index.css";

const App = () => {
  return (
    <div class="main-container">
      <div class="thx-wrapper flex">
        <div class="thx-drawer flex">
          <div class="main-title">Profile List</div>
          <div id="profileWrapper" class="drawer-select flex">
            <div id="profileList" class="scrollable">
              <div id="profile1" class="profile-item active default no-edit">
                default
              </div>
              <div id="profile2" class="profile-item game no-edit">
                game
              </div>
              <div id="profile3" class="profile-item movie no-edit">
                movie
              </div>
              <div id="profile4" class="profile-item music no-edit">
                music
              </div>
              <div id="custom1" class="profile-item custom">
                Custom 1
              </div>
              <div id="custom2" class="profile-item custom">
                demo long text demo long text demo
              </div>
              <input
                id="profileRename"
                class="profile-item"
                placeholder="Enter Profile Name"
                maxlength="25"
              />
            </div>

            <div class="toolbar flex">
              <div class="icon add" id="profileAdd"></div>
              <div class="icon edit" id="profileEdit"></div>
              <div class="icon delete" id="profileDelete"></div>

              <div class="icon down" id="profileDown"></div>
              <div class="icon up disabled" id="profileUp"></div>
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

        <div class="thx-window">
          <div class="sub-title flex">
            <h1 id="eqTitle" class="eq-title">
              Default
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
