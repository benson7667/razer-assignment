import React from "react";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import { Actions } from "./actions";

const SideBarContainers = (props) => <SideBar {...props} />;

const mapStateToProps = (state) => ({
  activeIndex: state.sideBar.activeIndex,
  isActiveEditing: state.sideBar.isActiveEditing,
  menuList: state.sideBar.menuList,
});

const mapDispatchToProps = {
  getMenuList: Actions.GET_MENU_LIST_REQUEST,
  setMenuActiveItem: Actions.SET_MENU_ACTIVE_ITEM,
  updateMenuItem: Actions.EDIT_MENU_ITEM_REQUEST,
  setActiveEditing: Actions.SET_ACTIVE_EDITING,
  removeMenuItem: Actions.REMOVE_MENU_ITEM_REQUEST,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainers);
