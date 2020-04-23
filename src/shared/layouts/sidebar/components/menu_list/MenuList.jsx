import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import findIndex from "lodash/findIndex";

import { Input } from "../../../../components";
import { Actions } from "../../actions";

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {
    if (window && typeof window !== "undefined") {
      window.addEventListener("click", this.handleListenClick);
      window.addEventListener("keydown", this.handleListenKeyDown);
    }
  }

  componentWillUnmount() {
    if (window && typeof window !== "undefined") {
      window.removeEventListener("click", this.handleListenClick);
      window.removeEventListener("keydown", this.handleListenKeyDown);
    }
  }

  componentDidUpdate(prevProps) {
    const { isActiveEditing, menuList, activeIndex } = this.props;

    // when input is visible, initialize it with current activeIndex's value
    // if (
    //   prevProps.isActiveEditing !== this.props.isActiveEditing &&
    //   this.props.isActiveEditing
    // ) {
    //   this.setState({ inputValue: this.handlePopulateInputValue() });
    // }

    // if current active index is last item, scroll to bottom
    const currentActiveIndex = findIndex(menuList, { id: activeIndex });
    if (currentActiveIndex === menuList.length - 1) {
      const parent = document.querySelector("#profileList");
      parent.scrollTo(0, parent.scrollHeight);
    }
  }

  handleListenClick = (e) => {
    const { inputValue } = this.state;
    const {
      activeIndex,
      isActiveEditing,
      setActiveEditing,
      updateMenuItem,
    } = this.props;
    // user is clicking within the input, do nothing
    if (this.node && this.node.contains && this.node.contains(e.target)) return;
    // user is clicking the edit button, do nothing
    if (e.target.className.indexOf("edit") > -1) return;
    if (e.target.tagName.toUpperCase() === "INPUT") return;

    // set active editing to false only if input field is visible
    if (isActiveEditing) {
      setActiveEditing(false);
      updateMenuItem({
        id: activeIndex,
        value: inputValue,
      });
    }
  };

  handleListenKeyDown = (e) => {
    const { inputValue } = this.state;
    const {
      activeIndex,
      isActiveEditing,
      setActiveEditing,
      updateMenuItem,
    } = this.props;
    // input field is not visible, do nothing
    if (!isActiveEditing) return;

    // user press key escape and enter, save the input
    if (e.keyCode === 13 || e.keyCode === 27) {
      setActiveEditing(false);
      updateMenuItem({
        id: activeIndex,
        value: inputValue,
      });
    }
  };

  // handlePopulateInputValue = () => {
  //   const { activeIndex, menuList } = this.props;
  //   const found = find(menuList, { id: activeIndex });
  //   return found.name;
  // };

  handleMenuItemClick = (id) => () => {
    this.props.setMenuActiveItem(id);
  };

  handleFocus = (e) => {
    e.target.select();
  };

  handleOnChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const { activeIndex, menuList, isActiveEditing } = this.props;
    const { inputValue } = this.state;

    return (
      <div id="profileList" className="scrollable">
        {menuList.length &&
          menuList.map((menuItem) => {
            const { id, name, icon, isDefault } = menuItem;

            return (
              <div key={menuItem.id} className="relative">
                <div
                  className={cx({
                    active: id === activeIndex,
                    "profile-item": true,
                    [icon]: true,
                  })}
                  onClick={this.handleMenuItemClick(id)}
                >
                  {name}
                </div>

                {isActiveEditing && !isDefault && (
                  <Input
                    autoFocus
                    className={cx({
                      "profile-item": true,
                      show: id === activeIndex && isActiveEditing,
                    })}
                    onFocus={this.handleFocus}
                    placeholder="Enter Profile Name"
                    maxLength={25}
                    value={inputValue}
                    onChange={this.handleOnChange}
                  />
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeIndex: state.sideBar.activeIndex,
  isActiveEditing: state.sideBar.isActiveEditing,
  menuList: state.sideBar.menuList,
});

const mapDispatchToProps = {
  setMenuActiveItem: Actions.SET_MENU_ACTIVE_ITEM,
  updateMenuItem: Actions.EDIT_MENU_ITEM_REQUEST,
  setActiveEditing: Actions.SET_ACTIVE_EDITING,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
