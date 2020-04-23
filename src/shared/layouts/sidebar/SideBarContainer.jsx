import React from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import { Actions } from "./actions";

const SideBarContainers = (props) => <SideBar {...props} />;

const mapDispatchToProps = {
  getMenuList: Actions.GET_MENU_LIST_REQUEST,
};

export default connect(null, mapDispatchToProps)(SideBarContainers);
