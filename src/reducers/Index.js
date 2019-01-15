import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import rolesReducer from "./rolesReducer";
import membersReducer from "./membersReducer";
import UsersReducers from "./UsersReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: UsersReducers,
  members: membersReducer,
  roles: rolesReducer
});
