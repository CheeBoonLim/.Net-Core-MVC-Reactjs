﻿import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class EditStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: "",
            errors: {
                Name: " ",
                Address: " "
            }
        };
        this.EditStore = this.EditStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveStore = this.SaveStore.bind(this);
    }

    EditStore(id) {
        this.setState({ Id: id }, () => {
            $("#StoreEditModal".concat(this.state.Id.toString())).modal();
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "Name":
                errors.Name =
                    value.length == 0
                        ? "Name is required"
                        : "";
                break;
            case "Address":
                errors.Address =
                    value.length == 0
                        ? "Address is required"
                        : "";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    SaveStore() {
        if (validateForm(this.state.errors)) {
            var data = {
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Store/SaveEditedStore",
                data: data
            })
        } else {
            event.preventDefault();
            const _errors = {};
            let Name = this.state.Name;
            let Address = this.state.Address;
            if (Name.length == 0) _errors.Name = "Name is required";
            if (Address.length == 0) _errors.Address = "Address is required";
            this.setState({ errors: _errors });
        }
    }

    render() {
        const store = this.props.store;
        const modelId = "StoreEditModal" + store.id.toString();
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-warning" onClick={() => this.EditStore(store.id)}>EDIT</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Edit store</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} placeholder={store.name} />
                                                <span className='text-danger'>{errors.Name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} placeholder={store.address} />
                                                <span className='text-danger'>{errors.Address}</span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="edit      &radic;" className="btn btn-success" onClick={this.SaveStore} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditStore;