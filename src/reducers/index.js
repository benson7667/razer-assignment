import { combineReducers } from "redux";
import sideBarReducer from "../shared/layouts/sidebar/reducers";

const reducers = combineReducers({
  sideBar: sideBarReducer,
});

export default reducers;
