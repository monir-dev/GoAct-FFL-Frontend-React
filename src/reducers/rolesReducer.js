import {
  ROLES_LOADING,
  ROLES_MODAL_LOADING,
  ROLES_MODAL_LOADING_STOP,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  GET_ROLES
} from "../actions/types";

const initialState = {
  roles: [],
  loading: false,
  modalLoading: false,
  successMsg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROLES_LOADING:
      return {
        ...state,
        loading: true
      };
    case ROLES_MODAL_LOADING:
      return {
        ...state,
        modalLoading: true
      };
    case ROLES_MODAL_LOADING_STOP:
      return {
        ...state,
        modalLoading: false
      };
    case ADD_ROLE:
      let rolesArray = state.roles;
      rolesArray.push(action.payload);
      return {
        ...state,
        roles: rolesArray,
        loading: false,
        modalLoading: false,
        successMsg: "Member successfully added."
      };
    case EDIT_ROLE:
      return {
        ...state,
        roles: action.payload,
        loading: false
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: action.payload,
        loading: false
      };
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
