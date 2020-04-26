import React from "react";
import { connect } from "react-redux";
import Content from "./Content";

const ContentContainer = (props) => <Content {...props} />;

const mapStateToProps = (state) => ({
  activeIndex: state.sideBar.activeIndex,
  activeName: state.sideBar.activeName,
  autoSaveCount: state.sideBar.autoSaveCount,
  isAutoSaving: state.sideBar.isAutoSaving,
  menuList: state.sideBar.menuList,
});

export default connect(mapStateToProps, null)(ContentContainer);
