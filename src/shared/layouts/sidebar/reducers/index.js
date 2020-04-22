import { ActionTypes } from "../actions";

const defaultState = {
  menuList: [],
  isLoadingMenuList: false,
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

    default:
      return state;
  }
};

export default settingReducer;
