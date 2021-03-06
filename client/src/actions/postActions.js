import { GET_POSTS_SUCCESS, GET_POSTS_PENDING, GET_POSTS_ERROR } from "./types";

import {
  getPosts,
  createPost,
  deletePost,
  getPostsById,
} from "../services/postService";

export const getPostAction = (categoryId, offset) => (dispatch) => {
  dispatch({
    type: GET_POSTS_PENDING,
  });
  getPosts(categoryId, offset)
    .then((res) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: GET_POSTS_ERROR,
          payload: err.response.data,
        });
      }
    });
};

export const getPostsByIdAction = (userId) => (dispatch) => {
  dispatch({
    type: GET_POSTS_PENDING,
  });
  getPostsById(userId)
    .then((res) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err) {
        dispatch({
          type: GET_POSTS_ERROR,
          payload: err.response.data,
        });
      }
    });
};

export const createPostAction = (formData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    createPost(formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deletePostAction = (postId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    deletePost(postId)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
