import React from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import { Actions } from "./actions";

const SideBarContainers = (props) => <SideBar {...props} />;

const mapStateToProps = (state) => ({
  menuList: state.sideBar.menuList,
  activeIndex: state.sideBar.activeIndex,
});

const mapDispatchToProps = {
  getMenuList: Actions.GET_MENU_LIST_REQUEST,
  setMenuActiveItem: Actions.SET_MENU_ACTIVE_ITEM,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainers);
