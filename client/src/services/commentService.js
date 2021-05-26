import axios from "axios";
import { heroku } from "../environments/index";

const API_URL = heroku;
const token = JSON.parse(localStorage.getItem("token"));

export const getComments = (postId = Number) => {
  return axios
    .get(API_URL + `comments/${postId}`, {
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

export const createComment = (formData) => {
  return axios
    .post(API_URL + "comments", formData, {
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

export const deleteComment = (commentId) => {
  return axios
    .delete(API_URL + "comments", {
      headers: {
        token: token,
      },
      data: {
        id: commentId,
      },
    })
    .then((res) => {
      return res;
    })

    .catch((err) => {
      throw err;
    });
};
