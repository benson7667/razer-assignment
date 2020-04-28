import ReactGA from "react-ga";
import config from "../../config";

const RAZER_MAIN_TRACKER = "RazerMainTracker";

ReactGA.initialize(config.gaId);

export const logPageView = (obj) => {
  const { pathname, data, title } = obj;

  if (pathname) {
    ReactGA.pageview(pathname, RAZER_MAIN_TRACKER, title);
  }
};
