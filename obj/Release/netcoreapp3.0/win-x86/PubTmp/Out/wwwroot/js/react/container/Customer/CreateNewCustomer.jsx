import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class CreateNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: "",
            errors: {
                Name: " ",
                Address: " "
            }
        };
        this.AddNewCustomer = this.AddNewCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveCustomer = this.SaveCustomer.bind(this);
    }

    AddNewCustomer() {
        $("#CustomerCreateModal").modal();
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
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Customer/SaveNewCustomer",
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
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewCustomer}>New Customer</button>
                <div className="modal fade" id="CustomerCreateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Create customer</h4>
                            </div>
                            <div className="modal-body" >
                                <form id="form" >
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} />
                                                <span className='text-danger'>{errors.Name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} noValidate />
                                                <span className='text-danger'>{errors.Address}</span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="create      &radic;" className="btn btn-success" onClick={this.SaveCustomer} />
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

export default CreateNewCustomer;
