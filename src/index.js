import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import GaPageView from "./shared/listeners/GaPageView";
import App from "./App";
import store from "./store";
import "./assets/css/index.css";
import "./assets/fonts/index.css";

ReactDOM.render(
  <Provider store={store}>
    <GaPageView>
      {/* we can add ReactRouter wrapping <App/> in the future */}
      <App />
    </GaPageView>
  </Provider>,
  document.getElementById("root")
);
