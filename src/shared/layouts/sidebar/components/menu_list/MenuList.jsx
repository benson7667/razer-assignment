import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import findIndex from "lodash/findIndex";
import find from "lodash/find";

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

    // when input is visible, initialize it with current activeIndex's name
    if (prevProps.isActiveEditing !== isActiveEditing && isActiveEditing) {
      const inputValue = this.initializeInputValue();
      this.setState({ inputValue });
    }

    // user add a new menu item, scroll to bottom
    const currentActiveIndex = findIndex(menuList, { id: activeIndex });
    if (currentActiveIndex === menuList.length - 1) {
      const parent = document.querySelector("#profileList");
      parent.scrollTo(0, parent.scrollHeight);
    }
  }

  handleListenClick = (e) => {
    const { isActiveEditing } = this.props;

    // user is clicking edit button / input field, do nothing
    if (e.target.className.indexOf("edit") > -1) return;
    if (e.target.tagName.toUpperCase() === "INPUT") return;

    // user is clicking anywhere and when input field is focus
    if (isActiveEditing) this.unfocusAndSave();
  };

  handleListenKeyDown = (e) => {
    const { isActiveEditing, setActiveEditing } = this.props;

    // input field is not visible, do nothing
    if (!isActiveEditing) return;

    // { 27: Exc }
    if (e.keyCode === 27) {
      setActiveEditing(false);
    }

    // { 13: Enter }
    if (e.keyCode === 13) this.unfocusAndSave();
  };

  // close the input field and save the value
  unfocusAndSave = () => {
    const { activeIndex, setActiveEditing, updateMenuItem } = this.props;
    const { inputValue } = this.state;
    setActiveEditing(false);
    updateMenuItem({
      id: activeIndex,
      value: inputValue,
    });
    this.setState({ inputValue: "" });
  };

  initializeInputValue = () => {
    const { activeIndex, menuList } = this.props;
    const initialInputValue = find(menuList, { id: activeIndex });
    return initialInputValue && initialInputValue.name;
  };

  handleMenuItemClick = (id) => (e) => {
    const { isActiveEditing, setMenuActiveItem } = this.props;
    return isActiveEditing ? this.unfocusAndSave() : setMenuActiveItem(id);
  };

  handleOnChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleFocus = (e) => {
    // some little tricks to resolve issues where auto select is not working due to async event
    const target = e.target;
    setTimeout(() => {
      target.select();
    }, 0);
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
