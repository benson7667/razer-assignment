import EasyActions from "redux-easy-actions";

const { Actions, Constants } = EasyActions({
  GET_MENU_LIST_REQUEST(type) {
    return { type };
  },
  GET_MENU_LIST_RESPONSE(type, payload) {
    return { type, payload };
  },
});

export { Actions, Constants as ActionTypes };
