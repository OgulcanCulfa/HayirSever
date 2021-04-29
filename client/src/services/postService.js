import axios from "axios";

const API_URL = "http://localhost:5000/";
const token = JSON.parse(localStorage.getItem("token"));

export const getPosts = () => {
  return axios
    .get(API_URL + "posts", {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err) throw err;
    });
};

export const createPost = (formData) => {
  return axios
    .post(API_URL + "posts", formData, {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err) throw err;
    });
};
