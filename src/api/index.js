import { get, put } from "../shared/utils/net";

export const getMenuList = () => get(`/posts`).then((res) => res.data);

export const autoSaveMenuList = (data) =>
  put(`/posts/1`, data).then((res) => res.data);
