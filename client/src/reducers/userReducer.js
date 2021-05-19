import {GET_USER, GET_CHAT_USER} from "../actions/types";

const initialState = {user: {}, chatUser: []};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_CHAT_USER:
      return {
        ...state,
        chatUser: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
