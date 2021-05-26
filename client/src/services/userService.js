import axios from "axios";
import { heroku } from "../environments/index";

const API_URL = heroku;
const token = JSON.parse(localStorage.getItem("token"));

export const getUser = (id) => {
  return axios
    .get(API_URL + `users/${id}`, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getChatUser = () => {
  return axios.get(API_URL + `chatusers`, {
    headers: {
      token: token,
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    throw err;
  })
}

export const updateUserInfo = (formData) => {
  return axios.put(API_URL + "users", formData, {
    headers: {
      token: token,
    },
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    throw err;
  })
};
