import { ActionTypes } from "../actions";
import storage, {
  RAZER_JWT_TOKEN,
  RAZER_USER_INFO,
} from "../../../utils/storage";
import { userInfoTransformer } from "../transformer";

const token = storage.get(RAZER_JWT_TOKEN);
const userInfo = storage.get(RAZER_USER_INFO);

const defaultState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isRegistering: false,
  isUserAuthenticated: !!token,
  userInfo: userInfoTransformer(userInfo),
  authError: null,
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_SUCCESS:
      return {
        ...state,
        token: action.token,
        userInfo: action.userInfo,
        isUserAuthenticated: action.token ? true : false,
      };

    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      };

    case ActionTypes.REGISTER_RESPONSE: {
      return {
        ...state,
        isRegistering: false,
      };
    }

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };

    case ActionTypes.LOGIN_RESPONSE: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...defaultState,
        isUserAuthenticated: false,
      };

    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isRegistering: false,
        authError: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
