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
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                    <tr id="LoadingStatus" style={{ color: "red" }}>
                        <td>Loading....</td>
                    </tr>
                </thead>
                
                <tbody>
                    {this.state.customers.map((customer) =>
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><EditCustomer customer={customer} /></td>
                            <td><DeleteCustomer customer={customer} /></td>
                        </tr>
                    )}
                    
                </tbody>
            </table>        
        );
    }
}

export default ListOfCustomer;