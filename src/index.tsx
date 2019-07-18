import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer, { initializeState } from "./reducers";
import App from "./App";
import "./static/style.scss";

/* store 생성 */
const store = createStore(
  reducer, // action to handle
  initializeState,
  composeWithDevTools() // composeWithDevTools : DevTools 미들웨어
);

const rootElement: HTMLElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
