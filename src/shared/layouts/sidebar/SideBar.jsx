import React, { Component } from "react";
import { array, func } from "prop-types";

import find from "lodash/find";
import get from "lodash/get";

import { AlertDialog } from "../../../shared/components";
import ActionToolbar from "./components/action_toolbar";
import MenuList from "./components/menu_list";

import "./styles.less";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToDelete: "",
      isAlertVisible: false,
      inputValue: "",
    };
  }

  componentDidMount() {
    this.props.getMenuList();
  }

  componentDidUpdate(prevProps) {
    const { activeIndex, menuList } = this.props;

    // successfully delete an item
    if (menuList.length < prevProps.menuList.length) {
      this.setState({
        isAlertVisible: false,
        idToDelete: "",
      });
    }
  }

  handleToolbarDeleteRequest = (id) => {
    this.setState({
      idToDelete: id,
      isAlertVisible: true,
    });
  };

  handleMenuHoverDeleteRequest = (id) => (e) => {
    e.stopPropagation();
    this.setState({
      idToDelete: id,
      isAlertVisible: true,
    });
  };

  generateAlertMessage = () => {
    const { menuList } = this.props;
    const { idToDelete } = this.state;
    const deleteItem = find(menuList, { id: idToDelete });
    const name = get(deleteItem, "name", "");
    return `Are you sure want to delete ${name} ?`;
  };

  handleConfirmDelete = () => {
    const { idToDelete } = this.state;
    const { removeMenuItem } = this.props;
    removeMenuItem(idToDelete);
  };

  handleCancelDelete = () => {
    this.setState({ isAlertVisible: false });
  };

  render() {
    const { idToDelete, isAlertVisible } = this.state;

    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-title">Profile List</div>

        <MenuList triggerDelete={this.handleMenuHoverDeleteRequest} />

        <ActionToolbar triggerDelete={this.handleToolbarDeleteRequest} />

        {idToDelete && isAlertVisible && (
          <AlertDialog
            title="Delete Profile"
            messages={this.generateAlertMessage()}
            onConfirm={this.handleConfirmDelete}
            onCancel={this.handleCancelDelete}
          />
        )}
      </div>
    );
  }
}

SideBar.propTypes = {
  getMenuList: func,
  removeMenuItem: func,
  menuList: array,
};

export default SideBar;
