import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import AuthStateListener from "./shared/listeners/AuthStateListener";
import FcmListener from "./shared/listeners/FcmListener";
import store from "./store";

import "./assets/css/index.css";
import "./assets/fonts/index.css";

ReactDOM.render(
  <Provider store={store}>
    <FcmListener>
      <AuthStateListener>
        <App />
      </AuthStateListener>
    </FcmListener>
  </Provider>,
  document.getElementById("root")
);
