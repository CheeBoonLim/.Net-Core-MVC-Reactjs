import React from "react";

class DeleteProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Price: null
        };
        this.DeleteProduct = this.DeleteProduct.bind(this);
        this.ConfirmDeleteProduct = this.ConfirmDeleteProduct.bind(this);
    }

    DeleteProduct(product) {
        this.setState({
            Id: product.id,
            Name: product.name,
            Price: product.price
        }, () => {
            $("#DeleteProduct".concat(this.state.Id.toString())).modal();
        });
    }

    ConfirmDeleteProduct() {
        var data = {
            Id: this.state.Id,
            Name: this.state.Name,
            Price: this.state.Price
        };
        $.ajax({
            type: "POST",
            url: "/Product/DeleteProduct",
            data: data
        })
    }

    render() {
        const product = this.props.product;
        const modelId = "DeleteProduct" + product.id.toString();
        return (
            <div>
                <button className="btn btn-danger" onClick={() => this.DeleteProduct(product)}>DELETE</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Delete product</h4>
                            </div>
                            <div className="modal-body">
                                <h4>Are you sure?</h4>
                                <h4>This will also delete all the sale(s) with this product.</h4>
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="delete      &chi;" className="btn btn-danger" onClick={this.ConfirmDeleteProduct} />
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

export default DeleteProduct;