import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/fonts/index.css";

import { SideBar } from "./shared/layouts";

const App = () => {
  return (
    <div class="main-container">
      <div class="thx-wrapper flex">
        <SideBar />
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
