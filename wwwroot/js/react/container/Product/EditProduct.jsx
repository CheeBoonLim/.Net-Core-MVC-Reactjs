import React from "react";

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Price: ""
        };
        this.EditProduct = this.EditProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveProduct = this.SaveProduct.bind(this);
    }

    EditProduct(id) {
        this.setState({ Id: id }, () => {
            $("#ProductEditModal".concat(this.state.Id.toString())).modal();
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveProduct() {
        if ($('#form').valid()) {
            var data = {
                Id: this.state.Id,
                Name: this.state.Name,
                Price: this.state.Price
            };
            $.ajax({
                type: "POST",
                url: "/Product/SaveEditedProduct",
                data: data
            })
        }
    }

    render() {
        const product = this.props.product;
        const modelId = "ProductEditModal" + product.id.toString();
        return (
            <div>
                <button className="btn btn-warning" onClick={() => this.EditProduct(product.id)}>EDIT</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Edit product</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} placeholder={product.name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">PRICE</label>
                                                <input name="Price" className="form-control" onChange={this.handleChange} placeholder={product.price} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="edit      &radic;" className="btn btn-success" onClick={this.SaveProduct} />
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

export default EditProduct;