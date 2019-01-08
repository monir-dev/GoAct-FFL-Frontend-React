import axios from "axios";
import {
  USERS_LOADING,
  GET_USERS,
  ADD_USERS,
  EDIT_USERS,
  EDIT_USER_STATUS,
  DELETE_USERS,
  GET_ERRORS
} from "../actions/types";

// Get all profile
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/users")
    .then(res => res.data)
    .then(res => {
      let data = res.map(item => {
        return {
          id: item.id,
          Name: item.Name,
          Email: item.Email,
          StaffId: item.StaffId,
          Desg: item.Desg,
          ServiceGroup: item.ServiceGroup,
          Company: item.Company,
          Dept: item.Dept,
          Location: item.Location,
          Country: item.Country,
          Approved: item.Approved
        };
      });
      dispatch({
        type: GET_USERS,
        payload: data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Edit User Approve Status
export const editUserApprovalStatus = (
  id,
  approvedStatus,
  users
) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .put(`/users/${id}`, {
      approved: approvedStatus
    })
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        let data = users.map(item => {
          if (item.id == id) {
            item.Approved = approvedStatus;
          }
          return item;
        });
        dispatch({
          type: EDIT_USER_STATUS,
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

// Delete user
export const deleteUser = (id, users) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .delete(`/users/${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.status == "success") {
        let data = users.filter(item => {
          if (item.id != id) {
            return item;
          }
        });
        dispatch({
          type: DELETE_USERS,
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
    type: USERS_LOADING
  };
};
