import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";


const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  postReducer,
  commentReducer,
  userReducer,
  categoryReducer
});

export default rootReducer;
