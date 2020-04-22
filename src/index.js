import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/fonts/index.css";

import { SideBar, Content } from "./shared/layouts";

const App = () => {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <SideBar />
        <Content />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
