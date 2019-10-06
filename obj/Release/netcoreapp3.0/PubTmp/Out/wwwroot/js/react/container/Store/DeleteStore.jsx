import React from "react";

class DeleteStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: ""
        };
        this.DeleteStore = this.DeleteStore.bind(this);
        this.ConfirmDeleteStore = this.ConfirmDeleteStore.bind(this);
    }

    DeleteStore(store) {
        this.setState({
            Id: store.id,
            Name: store.name,
            Address: store.address
        }, () => {
                $("#DeleteStore".concat(this.state.Id.toString())).modal();
        });
    }

    ConfirmDeleteStore() {
        var data = {
            Id: this.state.Id,
            Name: this.state.Name,
            Address: this.state.Address
        };
        $.ajax({
            type: "POST",
            url: "/Store/DeleteStore",
            data: data
        })
    }

    render() {
        const store = this.props.store;
        const modelId = "DeleteStore" + store.id.toString();
        return (
            <div>
                <button className="btn btn-danger" onClick={() => this.DeleteStore(store)}>DELETE</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Delete store</h4>
                            </div>
                            <div className="modal-body">
                                <h4>Are you sure?</h4>
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="delete      &chi;" className="btn btn-danger" onClick={this.ConfirmDeleteStore} />
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

export default DeleteStore;