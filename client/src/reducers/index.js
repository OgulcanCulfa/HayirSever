import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import postReducer from './postReducer';
import commentReducer from './commentReducer';


const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  postReducer,
  commentReducer
});

export default rootReducer;
