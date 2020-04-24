import { of, from } from "rxjs";
import { map, mergeMap, switchMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { v4 as uuid4 } from "uuid";

import * as api from "../../../../api";
import { Actions, ActionTypes } from "../actions";
import { defaultMenuList } from "../../../../constants";
import storage from "../../../utils/storage";

export const getMenuList = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_MENU_LIST_REQUEST),
    mergeMap(() => {
      const data = storage.getMenuList();
      if (data) {
        return of(Actions.GET_MENU_LIST_RESPONSE(data));
      }

      // Can call apis here to fetch menuList if storage is empty
      storage.setMenuList(defaultMenuList);
      return of(Actions.GET_MENU_LIST_RESPONSE(defaultMenuList));
    })
  );

export const addMenuItem = (action$, state$) =>
  action$.pipe(
    ofType(ActionTypes.ADD_MENU_ITEM_REQUEST),
    mergeMap(() => {
      const state = state$.value;
      const {
        sideBar: { menuList },
      } = state;

      const id = uuid4();
      const newItem = [
        {
          id,
          name: "New Profile",
          icon: "default",
        },
      ];

      const newMenuList = [...menuList, ...newItem];
      storage.setMenuList(newMenuList);

      return of(
        Actions.ADDED_MENU_ITEM_RESPONSE(newMenuList),
        Actions.SET_MENU_ACTIVE_ITEM(id)
      );
    })
  );

export const editMenuItem = (action$, state$) =>
  action$.pipe(
    ofType(ActionTypes.EDIT_MENU_ITEM_REQUEST),
    mergeMap((actions) => {
      const {
        sideBar: { menuList, activeIndex },
      } = state$.value;

      const trimedValue = actions.payload.value.trim();

      // do nothing...
      if (trimedValue === "") return from([]);

      const newMenuList = menuList.map((item) =>
        item.id === activeIndex && trimedValue !== ""
          ? {
              ...item,
              name: trimedValue,
            }
          : item
      );

      storage.setMenuList(newMenuList);
      return of(Actions.EDIT_MENU_ITEM_RESPONSE(newMenuList));
    })
  );

export const removeMenuItem = (action$, state$) =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_MENU_ITEM_REQUEST),
    mergeMap((actions) => {
      const {
        sideBar: { menuList },
      } = state$.value;

      const idToDelete = actions.payload;
      const newActiveIndex =
        menuList.findIndex((item) => item.id === idToDelete) - 1;
      const newMenuList = menuList.filter((item) => item.id !== idToDelete);

      storage.setMenuList(newMenuList);

      return of(
        Actions.REMOVE_MENU_ITEM_RESPONSE(newMenuList),
        Actions.SET_MENU_ACTIVE_ITEM(newMenuList[newActiveIndex].id)
      );
    })
  );

export const autoSave = (action$) =>
  action$.pipe(
    ofType(ActionTypes.AUTO_SAVE_REQUEST),
    switchMap(() => {
      const data = storage.getMenuList();
      if (!data) return from([]);
      return from(api.autoSaveMenuList(data)).pipe(
        map(() => Actions.AUTO_SAVE_RESPONSE(null)),
        catchError((err) => of(Actions.AUTO_SAVE_RESPONSE(err.message)))
      );
    })
  );
