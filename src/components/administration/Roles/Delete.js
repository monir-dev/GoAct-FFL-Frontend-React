import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteRole, deleteBulkRole } from "../../../actions/RolesAction";

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
    this.setState({ modalLoading: nextProps.roles.modalLoading });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.roles.successMsg)
      this.setState({ succMsg: nextProps.roles.successMsg });
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

    if (this.props.ids) {
      const { ids, deleteBulkRole } = this.props;
      const { roles } = this.props.roles;

      this.setState({
        modalLoading: false,
        succMsg: ""
      });
      // delete user
      deleteBulkRole(ids, roles);
    } else if (this.props.id) {
      const { id, deleteRole } = this.props;
      const { roles } = this.props.roles;

      this.setState({
        modalLoading: false,
        succMsg: ""
      });
      // delete user
      deleteRole(id, roles);
    }

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
  roles: state.roles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deleteRole, deleteBulkRole }
)(Delete);
