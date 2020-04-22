import { get } from "../shared/utils/net";

export const getMenuList = () => get(`/posts`).then((res) => res.data);
