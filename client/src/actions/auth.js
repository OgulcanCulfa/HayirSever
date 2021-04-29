import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import {login,logout,register} from "../services/authService";
import { Redirect } from "react-router";

export const registerAction = (Name, Surname, EmailAddress, Password) => (dispatch) => {
  return register(Name, Surname, EmailAddress, Password)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: res.message,
      });

      return Promise.resolve();
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: err.response.data,
      });

      return Promise.reject();
    });
};

export const loginAction = (EmailAddress, Password) => (dispatch) => {
  return login(EmailAddress, Password)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res },
      });

      return Promise.resolve();
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: err.response.data,
        });
      }

      return Promise.reject();
    });
};

export const logoutAction = () => (dispatch) => {
  logout();
  dispatch({
    type: LOGOUT,
  });
  <Redirect to="/login"></Redirect>
  window.location.reload()
};
