import React from "react";
import { connect } from "react-redux";

import ActionToolBar from "./ActionToolBar";
import { Actions as SideBarActions } from "../../actions";

const ActionToolBarContainer = (props) => <ActionToolBar {...props} />;

const mapStateToProps = (state) => ({
  menuList: state.sideBar.menuList,
  activeIndex: state.sideBar.activeIndex,
});

const mapDispatchToProps = {
  // side bar
  setMenuActiveItem: SideBarActions.SET_MENU_ACTIVE_ITEM,
  addMenuItem: SideBarActions.ADD_MENU_ITEM_REQUEST,
  setActiveEditing: SideBarActions.SET_ACTIVE_EDITING,
  removeMenuItem: SideBarActions.REMOVE_MENU_ITEM_REQUEST,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionToolBarContainer);
