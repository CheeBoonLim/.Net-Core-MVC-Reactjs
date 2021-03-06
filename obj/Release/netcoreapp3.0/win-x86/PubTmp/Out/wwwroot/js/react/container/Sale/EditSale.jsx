﻿import React from "react";

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

class EditSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Customers: [],
            Products: [],
            Stores: [],
            SelectedCustomerId: 0,
            SelectedProductId: 0,
            SelectedStoreId: 0,
            DateSold: "",
            errors: {
                Customer: "",
                Product: "",
                Store: "",
                DateSold: ""
            }
        };
        this.EditSale = this.EditSale.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveSale = this.SaveSale.bind(this);
    }

    EditSale(sale) {
        var me = this;
        let Id = this.state.Id;
        let DateSold = this.state.DateSold;
        Id = sale.id;
        DateSold = sale.dateSold;

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

        this.setState({ Id, DateSold }, () => {
            $("#SaleEditModal".concat(this.state.Id.toString())).modal();
        });
        this.setState({
            SelectedCustomerId: sale.customer.id,
            SelectedProductId: sale.product.id,
            SelectedStoreId: sale.store.id,
        });
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
                Id: this.state.Id,
                CustomerId: this.state.SelectedCustomerId,
                ProductId: this.state.SelectedProductId,
                StoreId: this.state.SelectedStoreId,
                DateSold: this.state.DateSold
            };
            $.ajax({
                type: "POST",
                url: "/Sale/SaveEditedSale",
                data: data
            })
        } else {
            event.preventDefault();
        }
    }

    render() {
        var sale = this.props.sale;
        const modelId = "SaleEditModal" + sale.id.toString();
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-warning" style={{ color: "white" }} onClick={() => this.EditSale(sale)}><i aria-hidden="true" className="edit icon"></i><b>EDIT</b></button>
                <div className="modal fade" id={modelId}>
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
                                                <input name="DateSold" className="form-control" onChange={this.handleChange} defaultValue={sale.dateSold} />
                                                <span className='text-danger'>{errors.DateSold}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>CUSTOMER</b></label>
                                                <div>
                                                    <select name="SelectedCustomerId" className="col-md-12" value={this.state.SelectedCustomerId} onChange={this.handleChange} style={{ height: "40px", border: "1px solid lightgrey" }}>
                                                        <option value="">--Select Customer--</option>
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
                                                        <option value="">--Select Product--</option>
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
                                                        <option value="">--Select Store--</option>
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
                                            <button className="ui green button" onClick={this.SaveSale}>edit &nbsp; &nbsp;<i aria-hidden="true" className="check icon right floated"></i></button>
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

export default EditSale;