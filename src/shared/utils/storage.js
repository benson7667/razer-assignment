const SIDEBAR_MENU_LIST = "SIDE_BAR_MENU_LIST";

const isLocalStorageAvailable = () => {
  try {
    window.localStorage.setItem("test", "test");
    window.localStorage.removeItem("test");
    return true;
  } catch (err) {
    return false;
  }
};

const storage = {
  set: (key, value, saveToCookies = true, durations = 86400000) => {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, value);
    }

    if (saveToCookies) {
      const date = new Date();
      date.setTime(date.getTime() + durations);
      document.cookie = `${key}=${value};expires=${date.toGMTString()}`;
    }
  },

  get: (key, getFromCookies = true) => {
    if (getFromCookies) {
      const regex = new RegExp(
        "(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"
      );
      const cookie = document.cookie.replace(regex, "$1");
      return cookie;
    }

    if (isLocalStorageAvailable()) {
      return window.localStorage.getItem(key);
    }

    return null;
  },

  remove: (key) => {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    }

    const expiry = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `${key}${expiry}`;
  },

  setMenuList: (value) => {
    storage.set(SIDEBAR_MENU_LIST, JSON.stringify(value));
  },
  getMenuList: () => {
    const value = storage.get(SIDEBAR_MENU_LIST);
    if (value) return JSON.parse(value);
    return null;
  },
};

export default storage;
