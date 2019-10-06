import React from "react";
import { Button } from "semantic-ui-react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

class ListOfProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        var me = this;
        $.ajax({
            type: "GET",
            url: "/Product/FetchProduct",
            success: function (data) {
                me.setState({ products: data });
                $("#LoadingStatus").remove();
            }
        })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                    <tr id="LoadingStatus" style={{ color: "red" }}>
                        <td>Loading....</td>
                    </tr>
                </thead>

                <tbody>
                    {this.state.products.map((product) =>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td><EditProduct product={product} /></td>
                            <td><DeleteProduct product={product} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfProduct;