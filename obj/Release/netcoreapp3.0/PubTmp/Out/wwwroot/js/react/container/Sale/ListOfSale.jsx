import React from "react";
import EditSale from "./EditSale";
import DeleteSale from "./DeleteSale";

class ListOfSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sales: [] };
    }

    componentDidMount() {
        var me = this;
        $.ajax({
            type: "GET",
            url: "/Sale/FetchSale",
            success: function (data) {
                me.setState({ sales: data });
            }
        })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.sales.map((sale) =>
                        <tr key={sale.id}>
                            <td>{sale.customer.name}</td>
                            <td>{sale.product.name}</td>
                            <td>{sale.store.name}</td>
                            <td>{sale.dateSold}</td>
                            <td><EditSale sale={sale} /></td>
                            <td><DeleteSale sale={sale} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfSale;