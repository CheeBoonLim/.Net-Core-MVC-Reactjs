import React from "react";
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
                    <tr className="row">
                        <th className="col">Name</th>
                        <th className="col">Price</th>
                        <th className="col">Action</th>
                        <th className="col">Action</th>
                    </tr>
                    <tr id="LoadingStatus">
                        <td className="ui basic loading button" >Loading</td>
                    </tr>
                </thead>

                <tbody>
                    {this.state.products.map((product) =>
                        <tr className="row" key={product.id}>
                            <td className="col">{product.name}</td>
                            <td className="col">${product.price}</td>
                            <td className="col"><EditProduct product={product} /></td>
                            <td className="col"><DeleteProduct product={product} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfProduct;