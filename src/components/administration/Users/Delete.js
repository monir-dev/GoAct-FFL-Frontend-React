import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteUser } from "../../../actions/UsersAction";

class Delete extends Component {
  constructor() {
    super();
    this.state = {
      modalLoading: false,
      succMsg: "",
      errors: {}
    };
  }

  componentDidMount() {
    // $("#Modal").modal("show");
  }

  componentWillReceiveProps = nextProps => {
    // code here
    this.setState({ modalLoading: nextProps.users.modalLoading });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.users.successMsg)
      this.setState({ succMsg: nextProps.users.successMsg });
  };

  onCloseModal = () => {
    this.setState({
      modalLoading: false,
      succMsg: ""
    });
    this.props.onModalClose();
  };

  onModalSubmit = e => {
    e.preventDefault();

    const { id, deleteUser } = this.props;
    const { users } = this.props.users;

    this.setState({
      modalLoading: false,
      succMsg: ""
    });
    // delete user
    deleteUser(id, users);
    this.props.onModalClose();
  };

  render() {
    return (
      <form onSubmit={this.onModalSubmit} method="POST">
        <div className="modal-body">
          <div className="form-group">
            <h5 style={{ color: "#63c2de" }}>Are you sure want to delte?</h5>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.onCloseModal}
          >
            Close
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(Delete);
