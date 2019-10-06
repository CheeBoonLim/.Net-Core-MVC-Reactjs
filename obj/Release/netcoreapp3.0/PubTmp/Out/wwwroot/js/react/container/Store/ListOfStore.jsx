import React from "react";
import EditStore from "./EditStore";
import DeleteStore from "./DeleteStore";

class ListOfStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stores: [] };
    }

    componentDidMount() {
        var me = this;
        $.ajax({
            type: "GET",
            url: "/Store/FetchStore",
            success: function (data) {
                me.setState({ stores: data });
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
                </thead>

                <tbody>
                    {this.state.stores.map((store) =>
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td><EditStore store={store} /></td>
                            <td><DeleteStore store={store} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfStore;