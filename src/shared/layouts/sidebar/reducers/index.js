import { ActionTypes, Actions } from "../actions";

const defaultState = {
  menuList: [],
  isLoadingMenuList: false,
  activeIndex: 1,
};

const settingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MENU_LIST_REQUEST:
      return {
        ...state,
      };

    case ActionTypes.GET_MENU_LIST_RESPONSE:
      return {
        ...state,
        isLoadingMenuList: false,
        menuList: [
          {
            id: 1,
            name: "Default",
            icon: "default",
            isDefault: true,
          },
          {
            id: 2,
            name: "Music",
            icon: "music",
            isDefault: true,
          },
          {
            id: 3,
            name: "Movie",
            icon: "movie",
            isDefault: true,
          },
          {
            id: 4,
            name: "Game",
            icon: "game",
            isDefault: true,
          },
          {
            id: 5,
            name: "Custom1",
            icon: "custom",
          },
          {
            id: 6,
            name: "demo long text demo long text demo",
            icon: "custom",
          },
        ],
      };

    case ActionTypes.SET_MENU_ACTIVE_ITEM: {
      console.log("action payload", action);
      return {
        ...state,
        activeIndex: action.payload,
      };
    }

    default:
      return state;
  }
};

export default settingReducer;
