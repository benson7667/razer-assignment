export const isValidEmail = (value) => {
  if (!value) return false;
  const exp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  return exp.test(value);
};
