import { ActionTypes } from "../actions";
import find from "lodash/find";
import get from "lodash/get";

const defaultState = {
  menuList: [],
  activeIndex: "",
  activeName: "",
  isActiveEditing: false,
  autoSaveCount: 0,
  isAutoSaving: false,
};

const sideBarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MENU_LIST_RESPONSE: {
      const activeIndex = get(action.payload, "0.id", ""); // arr[0].id
      const activeName = get(action.payload, "0.name", ""); // arr[0].name

      return {
        ...state,
        menuList: action.payload,
        activeIndex,
        activeName,
      };
    }

    case ActionTypes.SET_MENU_ACTIVE_ITEM:
      return {
        ...state,
        activeIndex: action.payload,
        activeName: find(state.menuList, { id: action.payload }).name || "",
      };

    case ActionTypes.SET_ACTIVE_EDITING: {
      return {
        ...state,
        isActiveEditing: action.payload,
      };
    }

    case ActionTypes.ADDED_MENU_ITEM_RESPONSE:
      return {
        ...state,
        menuList: action.payload,
      };

    case ActionTypes.REMOVE_MENU_ITEM_RESPONSE:
      return {
        ...state,
        menuList: action.payload,
      };

    case ActionTypes.EDIT_MENU_ITEM_RESPONSE:
      return {
        ...state,
        menuList: action.payload,
      };

    case ActionTypes.AUTO_SAVE_REQUEST:
      return {
        ...state,
        isAutoSaving: true,
      };

    case ActionTypes.AUTO_SAVE_RESPONSE:
      return {
        ...state,
        isAutoSaving: false,
        autoSaveCount: state.autoSaveCount + 1,
      };

    default:
      return state;
  }
};

export default sideBarReducer;
