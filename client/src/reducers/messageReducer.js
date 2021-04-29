import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { message: action.payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
