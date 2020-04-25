import React from "react";
import { Content, Header, SideBar } from "./shared/layouts";

const App = () => {
  return (
    <div className="app-container">
      <SideBar />
      <Header />
      <Content />
    </div>
  );
};

export default App;
