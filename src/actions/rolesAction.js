import axios from "axios";
import _ from "lodash";
import {
  ROLES_LOADING,
  ROLES_MODAL_LOADING,
  ROLES_MODAL_LOADING_STOP,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  GET_ROLES,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Get all profile
export const getRoles = () => dispatch => {
  dispatch(setRolesLoading());
  axios
    .get("/roles")
    .then(res => res.data)
    .then(res => {
      dispatch({
        type: GET_ROLES,
        payload: res
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ROLES,
        payload: null
      })
    );
};

// Add User
export const addRole = data => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post(`/roles`, data)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        dispatch({
          type: ADD_ROLE,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Adding role failed"
      })
    );
};

// Edit User Approve Status
export const editRole = (id, data, roles) => dispatch => {
  // dispatch(setRolesLoading());
  axios
    .put(`/roles/${id}`, data)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        // update role array
        const newRoles = roles.map(item => {
          if (item.id == id) {
            item.name = data.name;
            item.display_name = data.display_name;
          }
          return item;
        });
        // dispatch roles
        dispatch({
          type: EDIT_ROLE,
          payload: newRoles
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: "Edit failed"
      });
    });
};

// Delete user
export const deleteRole = (id, roles) => dispatch => {
  dispatch(setRolesLoading());
  axios
    .delete(`/roles/${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        const newRoles = roles.filter(item => item.id != id);
        dispatch({
          type: DELETE_ROLE,
          payload: newRoles
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Edit failed"
      })
    );
};

// Set roles loading
export const setRolesLoading = () => {
  return {
    type: ROLES_LOADING
  };
};

// Set roles modal loading
export const setRolesModalLoading = () => {
  return {
    type: ROLES_MODAL_LOADING
  };
};

// Stop roles modal loading
export const stopRolesModalLoading = () => {
  return {
    type: ROLES_MODAL_LOADING_STOP
  };
};
