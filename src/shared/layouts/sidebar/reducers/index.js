import { ActionTypes, Actions } from "../actions";
import { defaultMenuList } from "../constants";

const defaultState = {
  menuList: [],
  activeIndex: "",
};

const settingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MENU_LIST_RESPONSE:
      return {
        ...state,
        menuList: action.payload,
        activeIndex: action.payload.length ? action.payload[0].id : "",
      };

    case ActionTypes.SET_MENU_ACTIVE_ITEM: {
      return {
        ...state,
        activeIndex: action.payload,
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

    default:
      return state;
  }
};

export default settingReducer;
