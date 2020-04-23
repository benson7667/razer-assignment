import { of, from } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { v4 as uuid4 } from "uuid";

import { Actions, ActionTypes } from "../actions";
import { defaultMenuList } from "../constants";
import storage from "../../../utils/storage";

export const getMenuList = (action$, state$) =>
  action$.pipe(
    ofType(ActionTypes.GET_MENU_LIST_REQUEST),
    mergeMap(() => {
      const data = storage.getMenuList();
      if (data) {
        return of(Actions.GET_MENU_LIST_RESPONSE(data));
      }
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

      const trimedValue = actions.payload.value;
      const newMenuList = menuList.map((item) => {
        return item.id === activeIndex
          ? {
              ...item,
              name: trimedValue === "" ? item.name : trimedValue,
            }
          : item;
      });

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
