import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import find from "lodash/find";

import { sideBarIcon } from "../../../../../constants";
import { Input } from "../../../../components";
import { Actions } from "../../actions";
import "./styles.less";

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.scrollableRef = React.createRef();
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

    if (prevProps.activeIndex !== activeIndex) {
      const parent = document.querySelector(".menu-list");
      const element = document.getElementsByClassName(
        "menu-list-item active"
      )[0];
      const profileTitleHeight = 57;
      const top = parent.scrollTop;
      const offset = element.offsetTop - profileTitleHeight - top;
      const scrollableHeight = this.scrollableRef.current.clientHeight;

      if (!element || !parent) return;

      if (offset >= scrollableHeight) {
        parent.scrollTo(
          0,
          top + offset - scrollableHeight + profileTitleHeight
        );
      } else if (offset <= 0) {
        parent.scrollTo(0, top + offset - profileTitleHeight);
      }
    }
  }

  handleListenClick = (e) => {
    const { isActiveEditing } = this.props;

    console.log(this.scrollableRef.current);

    // when user click edit button, do nothing
    if (e.target.className.indexOf("ACTION_EDIT") > -1) return;

    // when input is active and user click main window, save value
    if (
      (isActiveEditing &&
        e.target.className.indexOf("app-content-wrapper") > -1) ||
      e.target === this.scrollableRef.current
    ) {
      this.closeInputAndSave();
    }
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
    if (e.keyCode === 13) this.closeInputAndSave();
  };

  // close the input field and save the value
  closeInputAndSave = () => {
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
    if (isActiveEditing && e.target.tagName.toUpperCase() === "INPUT") return;
    return isActiveEditing ? this.closeInputAndSave() : setMenuActiveItem(id);
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

  showScrollBar = () => {
    const elem = document.querySelector(".menu-list");
    if (elem) elem.classList.remove("hide-scrollbar");
  };

  hideScrollBar = () => {
    const elem = document.querySelector(".menu-list");
    if (elem) elem.classList.add("hide-scrollbar");
  };

  render() {
    const { activeIndex, menuList, isActiveEditing } = this.props;

    return (
      <>
        <ul
          className="menu-list hide-scrollbar"
          onMouseEnter={this.showScrollBar}
          onMouseLeave={this.hideScrollBar}
          ref={this.scrollableRef}
        >
          {menuList.length &&
            menuList.map((menuItem) => {
              const { id, name, isDefault } = menuItem;

              const lowCaseName = name.toLowerCase();
              const icon = sideBarIcon[lowCaseName]
                ? sideBarIcon[lowCaseName]
                : sideBarIcon["custom"];

              return (
                <li
                  key={id}
                  className={cx({
                    "menu-list-item": true,
                    active: id === activeIndex,
                  })}
                  onClick={this.handleMenuItemClick(id)}
                >
                  <i
                    className={cx({
                      "menu-icon": true,
                      [icon]: true,
                    })}
                  ></i>

                  <span className="menu-name">{name}</span>

                  {!isDefault && (
                    <i
                      onClick={this.props.triggerDelete(id)}
                      className="fa fa-times delete-icon"
                    ></i>
                  )}

                  {isActiveEditing && activeIndex === id && (
                    <Input
                      autoFocus
                      onFocus={this.handleFocus}
                      className="menu-list-item--input"
                      value={this.state.inputValue}
                      placeholder="Enter Profile Name"
                      maxLength={25}
                      onChange={this.handleOnChange}
                    />
                  )}
                </li>
              );
            })}
        </ul>
      </>
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
