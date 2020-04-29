import EasyActions from "redux-easy-actions";

const { Actions, Constants } = EasyActions({
  SET_USER(type, userInfo, token) {
    return { type, userInfo, token };
  },
  SET_USER_SUCCESS(type, userInfo, token) {
    return { type, userInfo, token };
  },

  LOGIN_REQUEST(type, email, password) {
    return { type, email, password };
  },
  LOGIN_RESPONSE(type) {
    return { type };
  },

  LOGOUT(type) {
    return { type };
  },
  LOGOUT_SUCCESS(type) {
    return { type };
  },

  REGISTER(type, payload) {
    return { type, payload };
  },
  REGISTER_SUCCESS(type) {
    return { type };
  },

  AUTH_ERROR(type, error) {
    return { type, error };
  },
});

export { Actions, Constants as ActionTypes };
