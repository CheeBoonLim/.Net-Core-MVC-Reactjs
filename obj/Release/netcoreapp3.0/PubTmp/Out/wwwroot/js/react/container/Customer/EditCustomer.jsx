import React from "react";

class EditCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: ""
        };
        this.EditCustomer = this.EditCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveCustomer = this.SaveCustomer.bind(this);
    }

    EditCustomer(id) {
        this.setState({ Id: id }, () => {
            $("#CustomerEditModal".concat(this.state.Id.toString())).modal();
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveCustomer() {
        if ($('#form').valid()) {
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
        }
    }

    render() {
        const customer = this.props.customer;
        const modelId = "CustomerEditModal" + customer.id.toString();
        return (
            <div>
                <button className="btn btn-warning" onClick={() => this.EditCustomer(customer.id)}>EDIT</button>
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
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} placeholder={customer.name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} placeholder={customer.address} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="edit      &radic;" className="btn btn-success" onClick={this.SaveCustomer} />
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