import size from "lodash/size";

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
