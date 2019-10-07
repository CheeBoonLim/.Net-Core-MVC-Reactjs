import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    if (!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

class CreateNewSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Customers: [],
            Products: [],
            Stores: [],
            SelectedCustomerId: 0,
            SelectedProductId: 0,
            SelectedStoreId: 0,
            DateSold: "",
            errors: {
                Customer: " ",
                Product: " ",
                Store: " ",
                DateSold: " "
            }
        };
        this.AddNewSale = this.AddNewSale.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "DateSold":
                if (value.length == 0) {
                    errors.DateSold = "Date sold is required";
                } else if (!isValidDate(value)) {
                    errors.DateSold = "Please insert valid date format: YYYY-MM-DD";
                } else {
                    errors.DateSold = "";
                }
                break;
            case "SelectedCustomerId":
                errors.Customer =
                    value == 0
                        ? "Customer is required"
                        : "";
                break;
            case "SelectedProductId":
                errors.Product =
                    value == 0
                        ? "Product is required"
                        : "";
                break;
            case "SelectedStoreId":
                errors.Store =
                    value == 0
                        ? "Store is required"
                        : "";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    SaveSale() {
        if (validateForm(this.state.errors)) {
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
        } else {
            event.preventDefault();
            const _errors = {};
            let SelectedCustomerId = this.state.SelectedCustomerId;
            let SelectedProductId = this.state.SelectedProductId;
            let SelectedStoreId = this.state.SelectedStoreId;
            let DateSold = this.state.DateSold;
            if (SelectedCustomerId == 0) _errors.Customer = "Customer is required";
            if (SelectedProductId == 0) _errors.Product = "Product is required";
            if (SelectedStoreId == 0) _errors.Store = "Store is required";
            if (DateSold.length == 0) _errors.DateSold = "Date sold is required";
            this.setState({ errors: _errors });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewSale}><b>New Sale</b></button>
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
                                                <label className="control-label"><b>DATE SOLD</b></label>
                                                <input name="DateSold" className="form-control" onChange={this.handleChange} placeholder="YYYY-MM-DD" />
                                                <span className='text-danger'>{errors.DateSold}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>CUSTOMER</b></label>
                                                <div>
                                                    <select name="SelectedCustomerId" className="col-md-12" value={this.state.SelectedCustomerId} onChange={this.handleChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="0">--Select Customer--</option>
                                                        {this.state.Customers.map((customer) =>
                                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                        )}
                                                    </select>
                                                    <span className='text-danger'>{errors.Customer}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>PRODUCT</b></label>
                                                <div>
                                                    <select name="SelectedProductId" className="col-md-12" value={this.state.SelectedProductId} onChange={this.handleChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="0">--Select Product--</option>
                                                        {this.state.Products.map((product) =>
                                                            <option key={product.id} value={product.id}>{product.name}</option>
                                                        )}
                                                    </select>
                                                    <span className='text-danger'>{errors.Product}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>STORE</b></label>
                                                <div>
                                                    <select name="SelectedStoreId" className="col-md-12" value={this.state.SelectedStoreId} onChange={this.handleChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="0">--Select Store--</option>
                                                        {this.state.Stores.map((store) =>
                                                            <option key={store.id} value={store.id}>{store.name}</option>
                                                        )}
                                                    </select>
                                                    <span className='text-danger'>{errors.Store}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="ui black button" data-dismiss="modal">cancel</a>
                                            <button className="ui teal button" onClick={this.SaveSale}>create &nbsp; &nbsp;<i aria-hidden="true" className="check icon right floated"></i></button>
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