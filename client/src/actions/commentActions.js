import {
    GET_COMMENTS_BY_ID_SUCCESS,
    GET_COMMENTS_BY_ID_PENDING,
    GET_COMMENTS_BY_ID_ERROR,
  } from "./types";
  
  import {  getComments, createComment  } from "../services/commentService";
  
  
  export const createCommentAction = (formData) => (dispatch) => {
    return new Promise((resolve,reject) => {
      createComment(formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err) {
          reject(err);
        }
      });
    })
    
  };
  
  export const getCommentAction = (postId) => (dispatch) => {
    dispatch({
      type: GET_COMMENTS_BY_ID_PENDING
    })
    getComments(postId)
      .then((res) => {
        dispatch({
          type: GET_COMMENTS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err) {
          dispatch({
            type: GET_COMMENTS_BY_ID_ERROR,
            payload: err.response.data,
          });
        }
      });
  };
  