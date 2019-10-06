import React from "react";

class CreateNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: ""
        };
        this.AddNewCustomer = this.AddNewCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveCustomer = this.SaveCustomer.bind(this);
    }

    AddNewCustomer() {
        $("#CustomerCreateModal").modal();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveCustomer() {
        if ($('#form').valid()) {
            var data = {
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Customer/SaveNewCustomer",
                data: data
            })
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewCustomer}>New Customer</button>
                <div className="modal fade" id="CustomerCreateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Create customer</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="create      &radic;" className="btn btn-success" onClick={this.SaveCustomer}/>
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