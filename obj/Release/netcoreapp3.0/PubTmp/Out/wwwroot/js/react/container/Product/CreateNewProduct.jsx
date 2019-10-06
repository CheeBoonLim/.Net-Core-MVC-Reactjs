import React from "react";

class CreateNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Price: null
        };
        this.AddNewProduct = this.AddNewProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveProduct = this.SaveProduct.bind(this);
    }

    AddNewProduct() {
        $("#ProductCreateModal").modal();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveProduct() {
        if ($('#form').valid()) {
            var data = {
                Name: this.state.Name,
                Price: this.state.Price
            };
            $.ajax({
                type: "POST",
                url: "/Product/SaveNewProduct",
                data: data
            })
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewProduct}>New Product</button>
                <div className="modal fade" id="ProductCreateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Create product</h4>
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
                                                <label className="control-label">Price</label>
                                                <input name="Price" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="create      &radic;" className="btn btn-success" onClick={this.SaveProduct} />
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

export default CreateNewProduct;