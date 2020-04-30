import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ActionTypes, Actions } from "../actions";
import { fireLogin, fireLogout, fireRegister } from "../../../utils/firebase";
import storage, {
  RAZER_JWT_TOKEN,
  RAZER_USER_INFO,
} from "../../../utils/storage";

const userDataTransformer = (data) => {
  const { uid, email, displayName, photoURL, phoneNumber } = data;
  return {
    uid: uid || "",
    email: email || "",
    displayName: displayName || "",
    photoURL: photoURL || "",
    phoneNumber: phoneNumber || "",
  };
};

export const setUserEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.SET_USER),
    mergeMap((action) => {
      const userInfo = userDataTransformer(action.userInfo);
      const token = action.token;

      if (!token) {
        storage.remove(RAZER_JWT_TOKEN);
        storage.remove(RAZER_USER_INFO);
      } else {
        storage.set(RAZER_JWT_TOKEN, token);
        storage.set(RAZER_USER_INFO, JSON.stringify(userInfo));
      }

      return of(Actions.SET_USER_SUCCESS(userInfo, token));
    })
  );

export const loginEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.LOGIN_REQUEST),
    mergeMap((action) =>
      from(fireLogin(action.email, action.password)).pipe(
        mergeMap(() => of(Actions.LOGIN_RESPONSE())),
        catchError((error) => of(Actions.AUTH_ERROR(error)))
      )
    )
  );

export const logoutEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.LOGOUT),
    mergeMap(() =>
      from(fireLogout()).pipe(
        mergeMap(() => of(Actions.LOGOUT_SUCCESS())),
        catchError((error) => of(Actions.AUTH_ERROR(error)))
      )
    )
  );

export const registerEpic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REGISTER_REQUEST),
    mergeMap((action) =>
      from(fireRegister(action.email, action.password)).pipe(
        mergeMap(() => of(Actions.REGISTER_RESPONSE())),
        catchError((error) => of(Actions.AUTH_ERROR(error)))
      )
    )
  );
