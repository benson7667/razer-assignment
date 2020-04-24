import React from "react";
import { AppContainer, Content, SideBar } from "./shared/layouts";

const App = () => {
  return (
    <div className="app-container">
      <SideBar />
      <Content />
    </div>
  );
};

export default App;
