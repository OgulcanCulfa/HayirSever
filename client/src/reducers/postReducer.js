import { GET_POSTS_PENDING ,GET_POSTS_SUCCESS, GET_POSTS_ERROR,CREATE_POST_SUCCESS,CREATE_POST_ERROR } from "../actions/types";

const initialState = {isFetchingPosts: false};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_PENDING:
      return {
        ...state,
        isFetchingPosts: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        postData: action.payload,
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        isFetchingPosts: false,
        postMsg: action.payload,
      };
      case CREATE_POST_SUCCESS: 
        return {
          ...state,
          postSuccessMsg: action.payload,
        }
      case CREATE_POST_ERROR:
        return {
          ...state,
          postMsg: action.payload
        }
    default:
      return state;
  }
}
