import React from "react";
import classnames from "classnames";
import Spinner from "../../common/Spinner";

export default ({
  title,
  staffId,
  modalLoading,
  errMsg,
  succMsg,
  onChange,
  onAddModalSubmit
}) => {
  let buttonState;
  let modalContent;
  let submitButtonText;

  if (modalLoading == true) {
    buttonState = modalLoading ? "disabled" : "";
    modalContent = <Spinner />;
    submitButtonText = "Adding...";
  } else {
    submitButtonText = "Add Member";
    modalContent = (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
          </div>
          <input
            className={classnames("form-control addModalSubmitButton", {
              "is-invalid": errMsg,
              "is-valid": succMsg
            })}
            id="staffId"
            type="text"
            name="staffId"
            placeholder="Staff Id"
            value={title}
            onChange={() => onChange}
          />
          <div className="invalid-feedback">{errMsg}</div>
          <div className="valid-feedback">{succMsg}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        id="AddModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={() => onAddModalSubmit} method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>

                {modalContent}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={buttonState}
                >
                  {submitButtonText}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseModal("AddModal")}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
