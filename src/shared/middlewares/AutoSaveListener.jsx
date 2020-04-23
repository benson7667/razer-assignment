import { Actions, ActionTypes } from "../layouts/sidebar/actions";

let timer = null;
const debounce = (fn, waitTime) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(fn, waitTime);
};

const actionsToTriggerAutoSave = [
  ActionTypes.ADDED_MENU_ITEM_RESPONSE,
  ActionTypes.EDIT_MENU_ITEM_RESPONSE,
  ActionTypes.REMOVE_MENU_ITEM_RESPONSE,
];

const AutoSaveListener = (store) => (next) => (action) => {
  if (actionsToTriggerAutoSave.indexOf(action.type) > -1) {
    debounce(() => {
      store.dispatch(Actions.AUTO_SAVE_REQUEST());
    }, 3000);
  }
  return next(action);
};

export default AutoSaveListener;
