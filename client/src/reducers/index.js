import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";


const rootReducer = combineReducers({
  authReducer,
  postReducer,
  commentReducer,
  userReducer,
  categoryReducer
});

export default rootReducer;
