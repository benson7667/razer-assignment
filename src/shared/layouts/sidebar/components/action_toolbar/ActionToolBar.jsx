import React, { useState, useRef, useEffect, Component } from "react";
import cx from "classnames";
import { array, func, string } from "prop-types";

class ActionToolbar extends Component {
  constructor(props) {
    super(props);
    this.deleteBoxRef = React.createRef();
    this.state = {
      isDeleteAlertBoxVisible: false,
    };
  }

  componentDidMount() {
    if (window && typeof window !== "undefined") {
      window.addEventListener("click", this.handleListenClick);
    }
  }

  componentWillUnmount() {
    window.addEventListener("click", this.handleListenClick);
  }

  componentDidUpdate(prevProps) {
    const { menuList } = this.props;
    // hide delete alert box when successfully delete an item
    if (menuList.length < prevProps.menuList.length) {
      this.setState({
        isDeleteAlertBoxVisible: false,
      });
    }
  }

  handleListenClick = (e) => {
    // user is clicking within the alert box, do nothing
    if (this.deleteBoxRef && this.deleteBoxRef.current.contains(e.target))
      return;

    // user is clicking the delete button, do nothing
    if (e.target.className.indexOf("delete") > -1) return;

    this.setState({ isDeleteAlertBoxVisible: false });
  };

  isDefaultItem = () => {
    const { menuList, activeIndex } = this.props;
    const activeItem = menuList.find((item) => item.id === activeIndex);
    return activeItem && activeItem.isDefault;
  };

  handleMenuDelete = () => {
    const { activeIndex, removeMenuItem } = this.props;
    removeMenuItem(activeIndex);
  };

  handleOnClickUp = () => {
    const { activeIndex, menuList, setMenuActiveItem } = this.props;
    const prevItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const prevItem = menuList[prevItemIndex - 1];
    if (prevItem) {
      setMenuActiveItem(prevItem.id);
    }
  };

  handleOnClickDown = () => {
    const { activeIndex, menuList, setMenuActiveItem } = this.props;
    const nextItemIndex = menuList.findIndex((item) => item.id === activeIndex);
    const nextItem = menuList[nextItemIndex + 1];
    if (nextItem) {
      setMenuActiveItem(nextItem.id);
    }
  };

  handleOnToolbarItemClick = (activeIndex) => (e) => {
    const target = e.target;

    switch (target.id) {
      case "add": {
        return this.props.addMenuItem();
      }

      case "edit": {
        return this.props.setActiveEditing(true);
      }

      case "delete": {
        return this.setState((prevState) => ({
          isDeleteAlertBoxVisible: !prevState.isDeleteAlertBoxVisible,
        }));
      }

      case "up": {
        if (target.className.indexOf("disabled") > -1) return;
        return this.handleOnClickUp();
      }

      case "down": {
        if (target.className.indexOf("disabled") > -1) return;
        return this.handleOnClickDown();
      }

      default:
        return;
    }
  };

  render() {
    const {
      activeIndex,
      addMenuItem,
      menuList,
      removeMenuItem,
      setActiveEditing,
      setMenuActiveItem,
    } = this.props;

    const { isDeleteAlertBoxVisible } = this.state;

    return (
      <>
        <div
          className="toolbar"
          onClick={this.handleOnToolbarItemClick(activeIndex)}
        >
          <div id="add" className="icon add"></div>
          {!this.isDefaultItem() && <div id="edit" className="icon edit"></div>}
          {!this.isDefaultItem() && (
            <div id="delete" className="icon delete"></div>
          )}

          <div
            id="up"
            className={cx({
              "icon up": true,
              disabled: menuList.length && activeIndex === menuList[0].id,
            })}
          />

          <div
            id="down"
            className={cx({
              "icon down": true,
              disabled:
                menuList.length &&
                activeIndex === menuList[menuList.length - 1].id,
            })}
          />
        </div>

        <div
          ref={this.deleteBoxRef}
          className={cx({
            "profile-del alert flex": true,
            show: isDeleteAlertBoxVisible,
          })}
        >
          <div className="title">Confirm Delete?</div>
          <div className="body-text t-center">
            {`Are you sure want to delete ${activeIndex} ?`}
          </div>
          <div onClick={this.handleMenuDelete} className="thx-btn">
            delete
          </div>
        </div>
      </>
    );
  }
}

// const ActionToolbar = (props) => {
//   const [isAlertDeleteVisible, setisAlertDeleteVisible] = useState(false);

//   const deleteAlertRef = useRef();

//   const {
//     activeIndex,
//     addMenuItem,
//     menuList,
//     removeMenuItem,
//     setActiveEditing,
//     setMenuActiveItem,
//   } = props;

//   useEffect(() => {
//     setisAlertDeleteVisible(false);
//   }, [menuList]);

//   return (
//     <>
//       <div className="toolbar" onClick={handleOnToolbarItemClick(activeIndex)}>
//         <div id="add" className="icon add"></div>
//         {!isDefaultItem() && <div id="edit" className="icon edit"></div>}
//         {!isDefaultItem() && <div id="delete" className="icon delete"></div>}

//         <div
//           id="up"
//           className={cx({
//             "icon up": true,
//             disabled: menuList.length && activeIndex === menuList[0].id,
//           })}
//         />

//         <div
//           id="down"
//           className={cx({
//             "icon down": true,
//             disabled:
//               menuList.length &&
//               activeIndex === menuList[menuList.length - 1].id,
//           })}
//         />
//       </div>

//       <div
//         className={cx({
//           "profile-del alert flex": true,
//           show: isAlertDeleteVisible,
//         })}
//         ref={deleteAlertRef}
//       >
//         <div className="title">Confirm Delete?</div>
//         <div className="body-text t-center">
//           {`Are you sure want to delete ${activeIndex} ?`}
//         </div>
//         <div onClick={handleMenuDelete} className="thx-btn">
//           delete
//         </div>
//       </div>
//     </>
//   );
// };

ActionToolbar.propTypes = {
  activeIndex: string,
  menuList: array,
  setMenuActiveItem: func,
};

export default ActionToolbar;
