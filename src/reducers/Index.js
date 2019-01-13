import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import usersReducer from "./membersReducer";
import rolesReducer from "./rolesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: usersReducer,
  roles: rolesReducer
});
