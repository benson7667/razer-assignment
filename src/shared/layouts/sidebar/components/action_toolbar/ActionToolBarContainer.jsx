import React from "react";
import { connect } from "react-redux";
import { Actions } from "../../actions";
import ActionToolBar from "./ActionToolBar";

const ActionToolBarContainer = (props) => <ActionToolBar {...props} />;

const mapStateToProps = (state) => ({
  menuList: state.sideBar.menuList,
  activeIndex: state.sideBar.activeIndex,
});

const mapDispatchToProps = {
  setMenuActiveItem: Actions.SET_MENU_ACTIVE_ITEM,
  addMenuItem: Actions.ADD_MENU_ITEM_REQUEST,
  removeMenuItem: Actions.REMOVE_MENU_ITEM_REQUEST,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionToolBarContainer);
