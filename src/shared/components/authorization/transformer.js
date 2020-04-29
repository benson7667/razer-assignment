export const userInfoTransformer = (data) => {
  const { uid, email, displayName, photoURL, phoneNumber } = data;
  return {
    uid: uid || "",
    email: email || "",
    displayName: displayName || "",
    photoURL: photoURL || "",
    phoneNumber: phoneNumber || "",
  };
};
