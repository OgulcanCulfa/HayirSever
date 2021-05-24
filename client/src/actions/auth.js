import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import { login, logout, register } from "../services/authService";
import { Redirect } from "react-router";

export const registerAction = (Name, Surname, EmailAddress, Password, department, classNum) => (
  dispatch
) => {
  return register(Name, Surname, EmailAddress, Password, department, classNum)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve(res);
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });

      return Promise.reject(err);
    });
};

export const loginAction = (EmailAddress, Password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    login(EmailAddress, Password)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res
        });
        resolve(res);
      })
      .catch((err) => {
          dispatch({
            type: LOGIN_FAIL,
          });
        reject(err);
      });
  });
};

export const logoutAction = () => async (dispatch) => {
  logout();
  await dispatch({
    type: LOGOUT,
  });
  await <Redirect to="/login"></Redirect>;
  window.location.reload();
};
