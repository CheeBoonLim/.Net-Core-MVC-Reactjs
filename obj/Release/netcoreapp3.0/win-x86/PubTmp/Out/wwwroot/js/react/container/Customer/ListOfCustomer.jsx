import React from "react";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

class ListOfCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { customers: [] };
    }

    componentDidMount() {
        var me = this;
        $.ajax({
            type: "GET",
            url: "/Customer/FetchCustomer",
            success: function (data) {
                me.setState({ customers: data });
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
                        <th className="col">Address</th>
                        <th className="col">Action</th>
                        <th className="col">Action</th>
                    </tr>
                    <tr id="LoadingStatus">
                        <td className="ui basic loading button" >Loading</td>
                    </tr>
                </thead>
                
                <tbody>
                    {this.state.customers.map((customer) =>
                        <tr className="row" key={customer.id}>
                            <td className="col">{customer.name}</td>
                            <td className="col">{customer.address}</td>
                            <td className="col"><EditCustomer customer={customer} /></td>
                            <td className="col"><DeleteCustomer customer={customer} /></td>
                        </tr>
                    )}
                    
                </tbody>
            </table>        
        );
    }
}

export default ListOfCustomer;