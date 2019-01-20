import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import membersReducer from "./membersReducer";

import UsersReducers from "./UsersReducers";
import RolesReducer from "./RolesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: UsersReducers,
  members: membersReducer,
  roles: RolesReducer
});
