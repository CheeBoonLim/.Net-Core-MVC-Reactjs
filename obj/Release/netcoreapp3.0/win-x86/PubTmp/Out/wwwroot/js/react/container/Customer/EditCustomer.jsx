﻿import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class EditCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: "",
            errors: {
                Name: "",
                Address: ""
            }
        };
        this.EditCustomer = this.EditCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveCustomer = this.SaveCustomer.bind(this);
    }

    EditCustomer(customer) {
        let Id = this.state.Id;
        let Name = this.state.Name;
        let Address = this.state.Address;
        Id = customer.id;
        Name = customer.name;
        Address = customer.address;

        this.setState({ Id, Name, Address }, () => {
            $("#CustomerEditModal".concat(this.state.Id.toString())).modal();
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

    SaveCustomer() {
        if (validateForm(this.state.errors)) {
            var data = {
                Id: this.state.Id,
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Customer/SaveEditedCustomer",
                data: data
            })
        } else {
            event.preventDefault();
        }
    }

    render() {
        const customer = this.props.customer;
        const modelId = "CustomerEditModal" + customer.id.toString();
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-warning" style={{ color: "white" }} onClick={() => this.EditCustomer(customer)}><i aria-hidden="true" className="edit icon"></i><b>EDIT</b></button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Edit customer</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>NAME</b></label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} defaultValue={customer.name} />
                                                <span className='text-danger'>{errors.Name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>ADDRESS</b></label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} defaultValue={customer.address} />
                                                <span className='text-danger'>{errors.Address}</span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="ui black button" data-dismiss="modal">cancel</a>
                                            <button className="ui green button" onClick={this.SaveCustomer}>edit &nbsp; &nbsp;<i aria-hidden="true" className="check icon right floated"></i></button>
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

export default EditCustomer;