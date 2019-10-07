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
                $("#LoadingStatus").remove();
            }
        })
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr className="row">
                        <th className="col">Customer</th>
                        <th className="col">Product</th>
                        <th className="col">Store</th>
                        <th className="col">Date Sold</th>
                        <th className="col">Action</th>
                        <th className="col">Action</th>
                    </tr>
                    <tr id="LoadingStatus">
                        <td className="ui basic loading button" >Loading</td>
                    </tr>
                </thead>

                <tbody>
                    {this.state.sales.map((sale) =>
                        <tr className="row" key={sale.id}>
                            <td className="col">{sale.customer.name}</td>
                            <td className="col">{sale.product.name}</td>
                            <td className="col">{sale.store.name}</td>
                            <td className="col">{sale.dateSold}</td>
                            <td className="col"><EditSale sale={sale} /></td>
                            <td className="col"><DeleteSale sale={sale} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfSale;