import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

import jwtDecode from "jwt-decode";


const token = JSON.parse(localStorage.getItem("token"));
const auth = token ? jwtDecode(token) : undefined;

const initialState = auth ? {isLoggedIn: true, auth: auth}
: {isLoggedIn: false, auth:null}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        auth: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    default:
      return state;
  }
}
