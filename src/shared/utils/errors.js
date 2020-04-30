import size from "lodash/size";
import isEmpty from "lodash/isEmpty";

export const firebaseAuthErr = {
  "auth/wrong-password": "Invalid password.",
  "auth/user-not-found": "Email is not exist.",
  "auth/email-already-in-use": "Email address is registered.",
  "auth/too-many-requests":
    "Too many unsuccessful login attempts. Please try again later.",
};

export const getFirebaseAuthErr = (err) => {
  if (!isEmpty(err)) {
    const { code } = err;
    return firebaseAuthErr[code]
      ? firebaseAuthErr[code]
      : "Something went wrong...";
  }
};

// TODO: add unit test
export const generateErrObj = (errArr) => {
  let errObj = {};

  errArr.forEach((errItem) => {
    const { key, errMsg } = errItem;
    if (errMsg) {
      errObj = {
        ...errObj,
        [key]: {
          ...errObj[key],
          [size(errObj[key])]: errMsg,
        },
      };
    }
  });

  return errObj;
};
