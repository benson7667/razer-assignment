import React from "react";
import { connect } from "react-redux";
import Content from "./Content";

const ContentContainer = (props) => <Content {...props} />;

const mapStateToProps = (state) => ({
  menuList: state.sideBar.menuList,
  activeIndex: state.sideBar.activeIndex,
});

export default connect(mapStateToProps, null)(ContentContainer);
