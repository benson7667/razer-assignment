import { v4 as uuidv4 } from "uuid";

export const defaultMenuList = [
  {
    id: uuidv4(),
    name: "Default",
    icon: "default",
    isDefault: true,
  },
  {
    id: uuidv4(),
    name: "Music",
    icon: "music",
    isDefault: true,
  },
  {
    id: uuidv4(),
    name: "Movie",
    icon: "movie",
    isDefault: true,
  },
  {
    id: uuidv4(),
    name: "Game",
    icon: "game",
    isDefault: true,
  },
];
