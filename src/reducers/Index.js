import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: usersReducer
});
