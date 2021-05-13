import axios from "axios";

const API_URL = "http://localhost:5000/";
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
