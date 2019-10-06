import React from "react";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class CreateNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Price: null,
            errors: {
                Name: " ",
                Price: " "
            }
        };
        this.AddNewProduct = this.AddNewProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveProduct = this.SaveProduct.bind(this);
    }

    AddNewProduct() {
        $("#ProductCreateModal").modal();
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
                Name: this.state.Name,
                Price: this.state.Price
            };
            $.ajax({
                type: "POST",
                url: "/Product/SaveNewProduct",
                data: data
            })
        } else {
            event.preventDefault();
            const _errors = {};
            let Name = this.state.Name;
            let Price = this.state.Price;
            if (Name.length <= 0) _errors.Name = "Name is required";
            if (Price == null) _errors.Price = "Price is required";
            this.setState({ errors: _errors });
        }
    }

    render() {
        const { errors } = this.state;
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
                                                <span className='text-danger'>{errors.Name}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">Price</label>
                                                <input name="Price" type="number" className="form-control" onChange={this.handleChange} />
                                                <span className='text-danger'>{errors.Price}</span>
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