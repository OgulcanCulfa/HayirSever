import {
  GET_COMMENTS_BY_ID_PENDING,
  GET_COMMENTS_BY_ID_SUCCESS,
  GET_COMMENTS_BY_ID_ERROR,
} from "../actions/types";

const initialState = { isFetchingComments: false, commentData: [] };

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_BY_ID_PENDING:
      return {
        ...state,
        isFetchingComments: true,
      };
    case GET_COMMENTS_BY_ID_SUCCESS:
      return {
        ...state,
        isFetchingComments: false,
        commentData: action.payload,
      };
    case GET_COMMENTS_BY_ID_ERROR:
      return {
        ...state,
        isFetchingComments: false,
        commentMsg: action.payload,
      };
    default:
      return state;
  }
}
