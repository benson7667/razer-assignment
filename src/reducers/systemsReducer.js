import { ActionTypes } from "../actions/systemActions";
import { ALERT } from "../constants";

const defaultState = {
  alert: {
    alertName: ALERT.GENERAL,
    isVisible: false,
    title: "",
    message: "",
    onCofirm: () => {},
  },
};

const systemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ALERT_BOX_OPEN: {
      //   const { alertName, title, message } = action.payload;
      return {
        ...state,
        alert: {
          ...state.alert,
          isVisible: true,
          title: action.payload.title,
          //   onCofirm: action.payload.fn,

          //   alertName,
          //   title,
          //   message,
        },
      };
    }

    case ActionTypes.SET_ALERT_BOX_CLOSE: {
      return defaultState;
    }

    default:
      return state;
  }
};

export default systemReducer;
