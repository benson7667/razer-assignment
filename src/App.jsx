import React from "react";
import { SideBar, Content } from "./shared/layouts";

const App = () => {
  return (
    // <div className="main-container">
    <div className="flex">
      <SideBar />
      <Content />
    </div>
    // </div>
  );
};

export default App;
