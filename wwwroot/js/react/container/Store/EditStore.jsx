import React from "react";

class EditStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null,
            Name: "",
            Address: ""
        };
        this.EditStore = this.EditStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveStore = this.SaveStore.bind(this);
    }

    EditStore(id) {
        this.setState({ Id: id }, () => {
            $("#StoreEditModal".concat(this.state.Id.toString())).modal();
        });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveStore() {
        if ($('#form').valid()) {
            var data = {
                Id: this.state.Id,
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Store/SaveEditedStore",
                data: data
            })
        }
    }

    render() {
        const store = this.props.store;
        const modelId = "StoreEditModal" + store.id.toString();
        return (
            <div>
                <button className="btn btn-warning" onClick={() => this.EditStore(store.id)}>EDIT</button>
                <div className="modal fade" id={modelId}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Edit store</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} placeholder={store.name} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} placeholder={store.address} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="edit      &radic;" className="btn btn-success" onClick={this.SaveStore} />
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

export default EditStore;