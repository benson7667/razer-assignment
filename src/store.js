import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";

import { rootEpic } from "./epics";
import reducers from "./reducers";

const logger = createLogger({
  collapsed: false,
});

const epicMiddleware = createEpicMiddleware();

const store = createStore(reducers, applyMiddleware(logger, epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
