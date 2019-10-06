import React from "react";
import ReactDOM from "react-dom";
import CreateNewSale from "./container/Sale/CreateNewSale";
import ListOfSale from "./container/Sale/ListOfSale";

ReactDOM.render(<CreateNewSale />, document.getElementById("CreateNewSale"));
ReactDOM.render(<ListOfSale />, document.getElementById("ListOfSale"));