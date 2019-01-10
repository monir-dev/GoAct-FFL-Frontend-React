import axios from "axios";
import {
  USERS_LOADING,
  USERS_MODAL_LOADING,
  GET_USERS,
  ADD_USERS,
  EDIT_USERS,
  EDIT_USER_STATUS,
  DELETE_USERS,
  GET_ERRORS,
  CLEAR_ERRORS,
  USERS_LOADING_STATUS_REFRESH
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

// Add User
export const addUser = (staffId, users) => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch(setUsersModalLoading());
  axios
    .post(`/users`, {
      staffId: staffId
    })
    .then(res => res.data)
    .then(res => {
      if (res.status == "failed") {
        dispatch({
          type: GET_ERRORS,
          payload: res.msg
        });
        dispatch({ type: USERS_LOADING_STATUS_REFRESH });
      } else if (res.status == "success") {
        let data = res.body;
        delete data.CompanyId;
        delete data.CreatedAt;
        delete data.Displayname;
        delete data.ParentId;
        delete data.Password;
        delete data.RememberToken;
        delete data.UpdatedAt;
        delete data.UserType;
        // add new user to state users
        dispatch({
          type: ADD_USERS,
          payload: data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: "Adding member failed"
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

// Set users loading
export const setUsersModalLoading = () => {
  return {
    type: USERS_MODAL_LOADING
  };
};
