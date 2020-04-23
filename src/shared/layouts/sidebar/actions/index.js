import EasyActions from "redux-easy-actions";

const { Actions, Constants } = EasyActions({
  GET_MENU_LIST_REQUEST(type) {
    return { type };
  },
  GET_MENU_LIST_RESPONSE(type, payload) {
    return { type, payload };
  },

  ADD_MENU_ITEM_REQUEST(type) {
    return { type };
  },
  ADDED_MENU_ITEM_RESPONSE(type, payload) {
    return { type, payload };
  },

  EDIT_MENU_ITEM_REQUEST(type, payload) {
    return { type, payload };
  },
  EDIT_MENU_ITEM_RESPONSE(type, payload) {
    return { type, payload };
  },

  REMOVE_MENU_ITEM_REQUEST(type, payload) {
    return { type, payload };
  },
  REMOVE_MENU_ITEM_RESPONSE(type, payload) {
    return { type, payload };
  },

  SET_ACTIVE_EDITING(type, payload) {
    return { type, payload };
  },
  SET_MENU_ACTIVE_ITEM(type, payload) {
    return { type, payload };
  },
});

export { Actions, Constants as ActionTypes };
