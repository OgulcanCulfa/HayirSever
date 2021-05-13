import { GET_CATEGORY } from "../actions/types";

const initialState = { categories: [] };

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
