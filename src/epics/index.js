import { combineEpics } from "redux-observable";
import * as sideBarEpics from "../shared/layouts/sidebar/epics";

const combineEpicFunctions = (epics) => {
  return epics.reduce((arr, epic) => {
    let keys = Object.keys(epic);
    return arr.concat(keys.map((key) => epic[key]));
  }, []);
};

const epics = combineEpicFunctions([sideBarEpics]);

export const rootEpic = combineEpics(...epics);
