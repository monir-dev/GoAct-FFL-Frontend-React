import {
  USERS_LOADING,
  USERS_MODAL_LOADING,
  GET_USERS,
  ADD_USERS,
  EDIT_USERS,
  EDIT_USER_STATUS,
  DELETE_USERS,
  USERS_LOADING_STATUS_REFRESH
} from "../actions/types";

const initialState = {
  users: [],
  loading: false,
  modalLoading: false,
  successMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case USERS_MODAL_LOADING:
      return {
        ...state,
        modalLoading: true
      };
    case USERS_LOADING_STATUS_REFRESH:
      return {
        ...state,
        loading: false,
        modalLoading: false,
        successMsg: ""
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case ADD_USERS:
      let userArray = state.users;
      userArray.push(action.payload);
      return {
        ...state,
        users: userArray,
        loading: false,
        modalLoading: false,
        successMsg: "Member successfully added."
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
