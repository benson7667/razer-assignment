import { combineReducers } from "redux";

import sideBarReducer from "../shared/layouts/sidebar/reducers";
import systemReducer from "./systemsReducer";

const reducers = combineReducers({
  sideBar: sideBarReducer,
  systems: systemReducer,
});

export default reducers;
