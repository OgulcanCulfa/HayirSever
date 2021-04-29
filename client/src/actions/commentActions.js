import {
    GET_COMMENTS_BY_ID_SUCCESS,
    GET_COMMENTS_BY_ID_PENDING,
    GET_COMMENTS_BY_ID_ERROR,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_ERROR
  } from "./types";
  
  import {  getComments, createComment  } from "../services/commentService";
  
  
  export const createCommentAction = (formData) => (dispatch) => {
    createComment(formData)
      .then((res) => {
        dispatch({
          type: CREATE_COMMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err) {
          dispatch({
            type: CREATE_COMMENT_ERROR,
            payload: err.response.data,
          });
        }
      });
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
  