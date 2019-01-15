import axios from "axios";
import {
  AUTH_USERS_LOADING,
  AUTH_USERS_MODAL_LOADING,
  AUTH_GET_USERS,
  AUTH_ADD_USERS,
  AUTH_EDIT_USERS,
  AUTH_DELETE_USERS,
  AUTH_USERS_LOADING_STATUS_REFRESH,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Get all profile
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/auth-users")
    .then(res => {
      dispatch({
        type: AUTH_GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Add User
export const addUser = data => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch(setUsersModalLoading());
  axios
    .post(`/register`, data)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        dispatch({
          type: AUTH_ADD_USERS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: AUTH_USERS_LOADING_STATUS_REFRESH });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editUser = (id, data) => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch(setUsersModalLoading());
  axios
    .post(`/auth-user/${id}`, data)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        dispatch({
          type: AUTH_EDIT_USERS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: AUTH_USERS_LOADING_STATUS_REFRESH });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete user
export const deleteUser = (id, users) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .delete(`/auth-user/${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        let data = users.filter(item => item.id != id);
        dispatch({
          type: AUTH_DELETE_USERS,
          payload: data
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

// Set users loading
export const setUsersLoading = () => {
  return {
    type: AUTH_USERS_LOADING
  };
};

// Set users loading
export const setUsersModalLoading = () => {
  return {
    type: AUTH_USERS_MODAL_LOADING
  };
};
