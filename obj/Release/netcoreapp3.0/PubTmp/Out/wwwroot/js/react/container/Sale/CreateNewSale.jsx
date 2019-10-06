import React from "react";

class CreateNewSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Customers: [],
            Products: [],
            Stores: [],
            SelectedCustomerId: "",
            SelectedProductId: "",
            SelectedStoreId: "",
            DateSold: ""
        };
        this.AddNewSale = this.AddNewSale.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.SaveSale = this.SaveSale.bind(this);
    }

    AddNewSale() {
        var me = this;
        $.ajax({
            type: "GET",
            url: "/Sale/FetchCustomer",
            success: function (data) {
                me.setState({ Customers: data });
            }
        })
        $.ajax({
            type: "GET",
            url: "/Sale/FetchProduct",
            success: function (data) {
                me.setState({ Products: data });
            }
        })
        $.ajax({
            type: "GET",
            url: "/Sale/FetchStore",
            success: function (data) {
                me.setState({ Stores: data });
            }
        })
        $("#SaleCreateModal").modal();
    }

    handleCustomerChange(event) {
        this.setState({ SelectedCustomerId: event.target.value });
    }

    handleProductChange(event) {
        this.setState({ SelectedProductId: event.target.value });
    }

    handleStoreChange(event) {
        this.setState({ SelectedStoreId: event.target.value });
    }

    handleDateChange(event) {
        this.setState({ DateSold: event.target.value });
    }

    SaveSale() {
        if ($('#form').valid()) {
            var data = {
                CustomerId: this.state.SelectedCustomerId,
                ProductId: this.state.SelectedProductId,
                StoreId: this.state.SelectedStoreId,
                DateSold: this.state.DateSold
            };
            $.ajax({
                type: "POST",
                url: "/Sale/SaveNewSale",
                data: data
            })
        }
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
                                                <input name="DateSold" className="form-control" onChange={this.handleDateChange} placeholder="YYYY-MM-DD" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">CUSTOMER</label>
                                                <div>
                                                    <select className="col-md-12" value={this.state.SelectedCustomerId} onChange={this.handleCustomerChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="">--Select Customer--</option>
                                                        {this.state.Customers.map((customer) =>
                                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">PRODUCT</label>
                                                <div>
                                                    <select className="col-md-12" value={this.state.SelectedProductId} onChange={this.handleProductChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="">--Select Product--</option>
                                                        {this.state.Products.map((product) =>
                                                            <option key={product.id} value={product.id}>{product.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">STORE</label>
                                                <div>
                                                    <select className="col-md-12" value={this.state.SelectedStoreId} onChange={this.handleStoreChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="">--Select Store--</option>
                                                        {this.state.Stores.map((store) =>
                                                            <option key={store.id} value={store.id}>{store.name}</option>
                                                        )}
                                                    </select>
                                                </div>
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