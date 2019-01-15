import {
  AUTH_USERS_LOADING,
  AUTH_USERS_MODAL_LOADING,
  AUTH_GET_USERS,
  AUTH_ADD_USERS,
  AUTH_EDIT_USERS,
  AUTH_DELETE_USERS,
  AUTH_USERS_LOADING_STATUS_REFRESH
} from "../actions/types";

const initialState = {
  users: [],
  loading: false,
  modalLoading: false,
  successMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTH_USERS_MODAL_LOADING:
      return {
        ...state,
        modalLoading: true
      };
    case AUTH_USERS_LOADING_STATUS_REFRESH:
      return {
        ...state,
        loading: false,
        modalLoading: false,
        successMsg: ""
      };
    case AUTH_GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case AUTH_ADD_USERS:
      let users = state.users;
      users.push(action.payload);
      return {
        ...state,
        users,
        loading: false,
        modalLoading: false,
        successMsg: "User successfully added."
      };
    case AUTH_EDIT_USERS:
      let usersList = state.users;
      usersList = usersList.map(item => {
        if (item.id == action.payload.id) {
          item = action.payload;
        }
        return item;
      });
      return {
        ...state,
        users: usersList,
        loading: false,
        modalLoading: false,
        successMsg: "User successfully updated."
      };
    case AUTH_DELETE_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
