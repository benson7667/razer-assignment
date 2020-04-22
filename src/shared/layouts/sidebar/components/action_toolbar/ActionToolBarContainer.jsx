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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionToolBarContainer);
