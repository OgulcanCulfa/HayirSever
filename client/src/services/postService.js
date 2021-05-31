import axios from "axios";
import { heroku } from "../environments/index";

const API_URL = heroku;
const token = JSON.parse(localStorage.getItem("token"));

export const getPosts = (categoryId, offset) => {
  return axios
    .get(API_URL + `posts?categoryId=${categoryId}&offset=${parseInt(offset)}`, {
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

export const getPostsById = (userId) => {
  return axios
    .post(
      API_URL + "postsbyid",
      { postUserId: userId },
      {
        headers: {
          token: token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
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
      throw err;
    });
};

export const deletePost = (postId) => {
  return axios
    .delete(API_URL + "posts", {
      headers: {
        token: token,
      },
      data: {
        id: postId,
      },
    })
    .then((res) => {
      return res;
    })

    .catch((err) => {
      throw err;
    });
};
