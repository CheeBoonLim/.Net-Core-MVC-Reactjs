import React from "react";

class DeleteCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: ""
        };
        this.DeleteCustomer = this.DeleteCustomer.bind(this);
        this.ConfirmDeleteCustomer = this.ConfirmDeleteCustomer.bind(this);
    }

    DeleteCustomer(customer) {
        this.setState({
            Id: customer.id,
            Name: customer.name,
            Address: customer.address
        }, () => {
            $("#DeleteCustomer".concat(this.state.Id.toString())).modal();
        });
    }

    ConfirmDeleteCustomer() {
        var data = {
            Id: this.state.Id,
            Name: this.state.Name,
            Address: this.state.Address
        };
        $.ajax({
            type: "POST",
            url: "/Customer/DeleteCustomer",
            data: data
        })
    }

    render() {
        const customer = this.props.customer;
        const modelId = "DeleteCustomer" + customer.id.toString();
        return (
            <div>
                <button className="btn btn-danger" onClick={() => this.DeleteCustomer(customer)}>DELETE</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Delete customer</h4>
                            </div>
                            <div className="modal-body">
                                <h4>Are you sure?</h4>
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="delete      &chi;" className="btn btn-danger" onClick={this.ConfirmDeleteCustomer} />
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

export default DeleteCustomer;