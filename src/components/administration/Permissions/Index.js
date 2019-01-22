import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import classnames from "classnames";
import Spinner from "../../common/Spinner";

class Permissions extends Component {
  constructor() {
    super();
    this.state = {
      role_id: null,
      permissions: [],
      selected_permission: [],
      modules: [],
      selected_modules: [],
      msg: ""
    };
  }

  componentDidMount = () => {
    const role_id = this.props.match.params.id;

    axios
      .get(`/permissions/${role_id}`)
      .then(res => res.data)
      .then(res => {
        if (res.status == "success") {
          this.setState({
            role_id: parseInt(role_id),
            permissions: res.data.permissions,
            modules: res.data.modules,
            selected_permission: res.data.thisRolePermissions
              .split(",")
              .map(item => parseInt(item))
          });
          res.data.modules.forEach(i => {
            this.selectModuleIfAllChildSelected(
              i.module,
              this.state.selected_permission
            );
          });
        }
      })
      .catch(err => console.log(err));
  };

  submitPermissions = () => {
    const { role_id, selected_permission } = this.state;
    axios
      .post(`/permissions/${role_id}`, { ids: selected_permission.join() })
      .then(res => res.data)
      .then(res => {
        if (res.status == "success") {
          this.props.history.goBack();
        }
      })
      .catch(err => console.log(err));
  };

  onCheck = e => {
    const module = e.target.getAttribute("module");
    if (module) {
      let selected_modules = this.state.selected_modules;
      const index = selected_modules.indexOf(module);
      if (index > -1) {
        selected_modules = selected_modules.filter((item, i) => index != i);
        this.unchcekAllChildElementOfAModule(module);
      } else {
        selected_modules.push(module);
        this.chcekAllChildElement(module);
      }
      this.setState({
        selected_modules: selected_modules
      });
    } else {
      const id = e.target.id;
      const parent_module = e.target.getAttribute("parent_module");
      let selected_permission = this.state.selected_permission;
      const index = selected_permission.indexOf(parseInt(id));
      if (index > -1) {
        selected_permission = selected_permission.filter((item, i) => {
          return index != i;
        });
      } else {
        selected_permission.push(parseInt(id));
      }
      this.selectModuleIfAllChildSelected(parent_module, selected_permission);
      this.setState({
        selected_permission: selected_permission
      });
    }
  };

  // check all child element
  chcekAllChildElement = module => {
    let selected_permission = this.state.selected_permission;
    const child = this.getAllChildsOfAModule(module);

    selected_permission = _.chain(selected_permission)
      .concat(child)
      .uniq()
      .value();

    this.setState({ selected_permission });
  };

  // uncheck all child element
  unchcekAllChildElementOfAModule = module => {
    let selected_permission = this.state.selected_permission;
    const child = this.getAllChildsOfAModule(module);

    selected_permission = _.chain(selected_permission)
      .difference(child)
      .value();

    this.setState({ selected_permission });
  };

  // get all child of a module
  getAllChildsOfAModule = module => {
    return _.chain(this.state.permissions)
      .groupBy("module")
      .value()
      [module].map(item => parseInt(item.id));
  };

  // check if a module should select or not
  selectModuleIfAllChildSelected = (module, selected_permission) => {
    const nodiff = _.chain(this.getAllChildsOfAModule(module))
      .difference(selected_permission)
      .isEmpty()
      .value();

    let selected_modules = this.state.selected_modules;

    if (nodiff) {
      selected_modules.push(module);
    } else {
      selected_modules = selected_modules.filter(item => item != module);
    }
    this.setState({
      selected_modules: selected_modules
    });
  };

  selectAllModuleAndChild = () => {
    const modules = this.state.modules.map(i => i.module);
    const permissions = this.state.permissions.map(i => parseInt(i.id));
    this.setState({
      selected_modules: modules,
      selected_permission: permissions
    });
  };

  deselectAllModuleAndChild = () => {
    this.setState({ selected_modules: [], selected_permission: [] });
  };

  render() {
    const {
      permissions,
      selected_permission,
      modules,
      selected_modules
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="table-before">
            <h4>
              <i className="fas fa-unlock-alt" />
              Assign permissions
            </h4>
            <div className="table-before-button-group">
              <button
                className="btn btn-sm  btn-outline-warning"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>{" "}
              <button
                className="btn btn-sm  btn-outline-primary"
                onClick={this.submitPermissions}
              >
                Assign permissions
              </button>
            </div>
          </div>
        </div>

        {_.isEmpty(permissions) ? (
          <Spinner />
        ) : (
          <div className="card">
            <div className="card-body">
              <h5>
                <button
                  className="btn btn-link"
                  style={{
                    padding: "3px",
                    fontSize: "18px",
                    marginTop: "-4px"
                  }}
                  onClick={this.selectAllModuleAndChild}
                >
                  Select All
                </button>
                /
                <button
                  className="btn btn-link"
                  style={{
                    padding: "3px",
                    fontSize: "18px",
                    marginTop: "-4px"
                  }}
                  onClick={this.deselectAllModuleAndChild}
                >
                  Deelect All
                </button>
              </h5>

              <div>
                {modules.map(m => {
                  const check_field =
                    selected_modules.indexOf(m.module) > -1 ? "checked" : "";
                  return (
                    <div key={m.module}>
                      <div className="form-check parentCheckbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={m.module}
                          module={m.module}
                          name={m.module}
                          onChange={this.onCheck}
                          checked={check_field}
                        />
                        <label htmlFor="parentItem">
                          {m.module.toUpperCase()}
                        </label>
                      </div>
                      {permissions.map(p => {
                        if (p.module === m.module) {
                          const checked =
                            selected_permission.indexOf(parseInt(p.id)) > -1
                              ? "checked"
                              : "";
                          return (
                            <div
                              className="form-check childCheckbox"
                              key={p.id}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={p.id}
                                name={p.name}
                                parent_module={p.module}
                                onChange={this.onCheck}
                                checked={checked}
                              />
                              <label htmlFor={p.id}>{p.name}</label>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="SubmitButtonBlock">
                <button
                  className="btn btn-sm btn-lg btn-outline-primary"
                  id="bulk"
                  onClick={this.submitPermissions}
                >
                  Assign permissions
                </button>
              </div>
            </div>
          </div>
        )}
        <br />
      </div>
    );
  }
}

export default Permissions;
