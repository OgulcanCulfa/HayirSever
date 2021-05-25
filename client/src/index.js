import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import { BrowserRouter } from "react-router-dom";
import 'alertifyjs/build/css/alertify.min.css';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);
