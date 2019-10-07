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
                    {this.state.stores.map((store) =>
                        <tr className="row" key={store.id}>
                            <td className="col">{store.name}</td>
                            <td className="col">{store.address}</td>
                            <td className="col"><EditStore store={store} /></td>
                            <td className="col"><DeleteStore store={store} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default ListOfStore;