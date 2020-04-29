import { combineEpics } from "redux-observable";
import * as sideBarEpics from "../shared/layouts/sidebar/epics";
import * as authEpics from "../shared/components/authorization/epics/authEpics";

const combineEpicFunctions = (epics) =>
  epics.reduce((arr, epic) => {
    let keys = Object.keys(epic);
    return arr.concat(keys.map((key) => epic[key]));
  }, []);

const epics = combineEpicFunctions([sideBarEpics, authEpics]);

export const rootEpic = combineEpics(...epics);
