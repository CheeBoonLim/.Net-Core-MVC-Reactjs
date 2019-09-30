import React from "react";

class CreateNewSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductName: "--Select Product--",
            CustomerName: "--Select Customer--",
            StoreName: "--Select Name--",
            DateSold: null
        };
        this.AddNewSale = this.AddNewSale.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.SaveSale = this.SaveSale.bind(this);
        this.Selected = this.Selected.bind(this);
    }

    AddNewSale() {
        $("#SaleCreateModal").modal();
    }

    handleCustomerChange(event) {
        this.setState({ CustomerName: event.target.value });
    }

    handleProductChange(event) {
        this.setState({ ProductName: event.target.value });
    }

    handleStoreChange(event) {
        this.setState({ StoreName: event.target.value });
    }

    SaveSale() {
        if ($('#form').valid()) {
            var data = {
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Sale/SaveNewSale",
                data: data
            })
        }
    }

    Selected() {
        $(document).ready(function () {
            $("#SelectId").change(function () {
            });
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewSale}>New Sale</button>
                <div className="modal fade" id="SaleCreateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Create sale</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-5">
                                                <label className="control-label">DATE SOLD</label>
                                                <input name="DateSold" className="form-control" onChange={this.handleChange} placeholder="YYYY-MM-DD" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">CUSTOMER</label>
                                                <div>
                                                    <select className="col-md-12" value={this.state.CustomerName} onChange={this.handleCustomerChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="--Select Product--">--Select Product--</option>
                                                        <option value="grapefruit">Grapefruit</option>
                                                        <option value="lime">Lime</option>
                                                        <option value="coconut">Coconut</option>
                                                        <option value="mango">Mango</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">PRODUCT</label>
                                                <input name="ProductName" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">STORE</label>
                                                <input name="StoreName" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="create      &radic;" className="btn btn-success" onClick={this.SaveSale} />
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

export default CreateNewSale;