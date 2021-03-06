﻿import React from "react";

class DeleteSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            CustomerId: null,
            ProductId: null,
            StoreId: null,
            DateSold: null
        };
        this.DeleteSale = this.DeleteSale.bind(this);
        this.ConfirmDeleteSale = this.ConfirmDeleteSale.bind(this);
    }

    DeleteSale(sale) {
        this.setState({
            Id: sale.id,
            CustomerId: sale.customerId,
            ProductId: sale.productId,
            StoreId: sale.storeId,
            DateSold: sale.dateSold,
        }, () => {
            $("#DeleteSale".concat(this.state.Id.toString())).modal();
        });
    }

    ConfirmDeleteSale() {
        var data = {
            Id: this.state.Id,
            CustomerId: this.state.CustomerId,
            ProductId: this.state.ProductId,
            StoreId: this.state.StoreId,
            DateSold: this.state.DateSold
        };
        $.ajax({
            type: "POST",
            url: "/Sale/DeleteSale",
            data: data
        })
    }

    render() {
        const sale = this.props.sale;
        const modelId = "DeleteSale" + sale.id.toString();
        return (
            <div>
                <button className="btn btn-danger" onClick={() => this.DeleteSale(sale)}><i aria-hidden="true" className="trash icon"></i><b>DELETE</b></button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Delete sale</h4>
                            </div>
                            <div className="modal-body">
                                <h4>Are you sure?</h4>
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="modal-footer">
                                            <a className="ui black button" data-dismiss="modal">cancel</a>
                                            <button className="ui red button" onClick={this.ConfirmDeleteSale}>delete &nbsp; &nbsp;<i aria-hidden="true" className="delete icon white right floated"></i></button>
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

export default DeleteSale;