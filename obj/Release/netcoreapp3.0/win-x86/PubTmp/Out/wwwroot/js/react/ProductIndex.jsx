import React from "react";
import ReactDOM from "react-dom";
import CreateNewProduct from "./container/Product/CreateNewProduct";
import ListOfProduct from "./container/Product/ListOfProduct";

ReactDOM.render(<CreateNewProduct />, document.getElementById("CreateNewProduct"));
ReactDOM.render(<ListOfProduct />, document.getElementById("ListOfProduct"));