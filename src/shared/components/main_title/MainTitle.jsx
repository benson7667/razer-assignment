import React from "react";
import { any, string } from "prop-types";
import "./styles.less";

const MainTitle = (props) => {
  const { title, subtitle, children } = props;

  return (
    <div className="razer-title-wrapper">
      <h1 className="razer-title">{title}</h1>
      <p className="razer-subtitle">{subtitle}</p>
      {children}
    </div>
  );
};

MainTitle.propTypes = {
  title: string,
  subtitle: string,
  children: any,
};

export default MainTitle;
