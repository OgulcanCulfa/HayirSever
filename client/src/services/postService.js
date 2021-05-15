import axios from "axios";

const API_URL = "http://localhost:5000/";
const token = JSON.parse(localStorage.getItem("token"));

export const getPosts = (categoryId) => {
  return axios
    .get(API_URL + `posts?categoryId=${categoryId}`, {
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
