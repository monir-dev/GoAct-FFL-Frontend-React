import {
  USERS_LOADING,
  GET_USERS,
  ADD_USERS,
  EDIT_USERS,
  EDIT_USER_STATUS,
  DELETE_USERS
} from "../actions/types";

const initialState = {
  users: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case ADD_USERS:
      return {
        ...state,
        loading: false
      };
    case EDIT_USERS:
      return {
        ...state,
        loading: false
      };
    case EDIT_USER_STATUS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case DELETE_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
