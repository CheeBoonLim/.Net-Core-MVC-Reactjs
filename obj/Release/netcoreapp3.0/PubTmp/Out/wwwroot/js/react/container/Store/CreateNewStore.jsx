import React from "react";

class CreateNewStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: ""
        };
        this.AddNewStore = this.AddNewStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SaveStore = this.SaveStore.bind(this);
    }

    AddNewStore() {
        $("#StoreCreateModal").modal();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    SaveStore() {
        if ($('#form').valid()) {
            var data = {
                Name: this.state.Name,
                Address: this.state.Address
            };
            $.ajax({
                type: "POST",
                url: "/Store/SaveNewStore",
                data: data
            })
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.AddNewStore}>New Store</button>
                <div className="modal fade" id="StoreCreateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="ModalTitle">Create store</h4>
                            </div>
                            <div className="modal-body">
                                <form id="form">
                                    <fieldset id="SubmitForm">
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">NAME</label>
                                                <input name="Name" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                <label className="control-label">ADDRESS</label>
                                                <input name="Address" className="form-control" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <a className="btn btn-dark" data-dismiss="modal">cancel</a>
                                            <input type="submit" value="create      &radic;" className="btn btn-success" onClick={this.SaveStore} />
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

export default CreateNewStore;