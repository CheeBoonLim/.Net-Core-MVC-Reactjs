import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Price: null,
            errors: {
                Name: "",
                Price: ""
            }
        };
        this.EditProduct = this.EditProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveProduct = this.SaveProduct.bind(this);
    }

    EditProduct(product) {
        let Id = this.state.Id;
        let Name = this.state.Name;
        let Price = this.state.Price;
        Id = product.id;
        Name = product.name;
        Price = product.price;

        this.setState({ Id, Name, Price }, () => {
            $("#ProductEditModal".concat(this.state.Id.toString())).modal();
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "Name":
                errors.Name =
                    value.length == 0
                        ? "Name is required"
                        : "";
                break;
            case "Price":
                if (value.length == 0) {
                    errors.Price = "Price is required";
                } else if (value < 0) {
                    errors.Price = "Price must be larger than 0";
                } else {
                    errors.Price = "";
                }
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    SaveProduct() {
        if (validateForm(this.state.errors)) {
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
        } else {
            event.preventDefault();
        }
    }

    render() {
        const product = this.props.product;
        const modelId = "ProductEditModal" + product.id.toString();
        const { errors } = this.state;
        return (
            <div>
                <button className="btn btn-warning" style={{ color: "white" }} onClick={() => this.EditProduct(product)}><i aria-hidden="true" className="edit icon"></i><b>EDIT</b></button>
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
                                                <label className="control-label"><b>NAME</b></label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} defaultValue={product.name} />
                                                <span className='text-danger'>{errors.Name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label"><b>PRICE</b></label>
                                                <input name="Price" type="number" className="form-control" onChange={this.handleChange} defaultValue={product.price} />
                                                <span className='text-danger'>{errors.Price}</span>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="ui black button" data-dismiss="modal">cancel</a>
                                            <button className="ui green button" onClick={this.SaveProduct}>edit &nbsp; &nbsp;<i aria-hidden="true" className="check icon right floated"></i></button>
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