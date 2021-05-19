import { GET_USER, GET_CHAT_USER } from "./types";

import { getUser, updateUserInfo, getChatUser } from "../services/userService";

export const getUserAction = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getUser(id)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const getChatUserAction = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    getChatUser()
      .then((res) => {
        dispatch({
          type: GET_CHAT_USER,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const updateUserInfoAction = (formData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    updateUserInfo(formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
