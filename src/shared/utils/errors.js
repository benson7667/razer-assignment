import size from "lodash/size";

export const firebaseErrorMsg = {
  "auth/email-already-in-use": "Email address is exist.",
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
