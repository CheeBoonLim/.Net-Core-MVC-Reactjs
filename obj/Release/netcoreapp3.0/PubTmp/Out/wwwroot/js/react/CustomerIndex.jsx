import React from "react";
import ReactDOM from "react-dom";
import CreateNewCustomer from "./container/Customer/CreateNewCustomer";
import ListOfCustomer from "./container/Customer/ListOfCustomer";

ReactDOM.render(<CreateNewCustomer />, document.getElementById("CreateNewCustomer"));
ReactDOM.render(<ListOfCustomer />, document.getElementById("ListOfCustomer"));