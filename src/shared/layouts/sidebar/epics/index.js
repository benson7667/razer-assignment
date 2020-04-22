import { of, from } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Actions, ActionTypes } from "../actions";
import * as api from "../../../../api";

export const getMenuList = (action$, state$) =>
  action$.pipe(
    ofType(ActionTypes.GET_MENU_LIST_REQUEST),
    mergeMap((action) => {
      return from(api.getMenuList()).pipe(
        map((data) => {
          console.log("data", data);
          return Actions.GET_MENU_LIST_RESPONSE(null);
        }),
        catchError((err) => of(Actions.GET_MENU_LIST_RESPONSE(err.message)))
      );
    })
  );
