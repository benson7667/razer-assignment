import EasyActions from "redux-easy-actions";

const { Actions, Constants } = EasyActions({
  SET_ALERT_BOX_OPEN(type, payload) {
    return { type, payload };
  },
  SET_ALERT_BOX_CLOSE(type) {
    return { type };
  },
});

export { Actions, Constants as ActionTypes };
