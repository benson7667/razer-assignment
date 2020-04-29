import { combineReducers } from "redux";

import sideBarReducer from "../shared/layouts/sidebar/reducers";
import userReducer from "../shared/components/authorization/reducers";

const reducers = combineReducers({
  sideBar: sideBarReducer,
  user: userReducer,
});

export default reducers;
