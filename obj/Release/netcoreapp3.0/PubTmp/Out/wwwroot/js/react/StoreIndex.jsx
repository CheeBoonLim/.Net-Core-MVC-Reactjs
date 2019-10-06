import React from "react";
import ReactDOM from "react-dom";
import CreateNewStore from "./container/Store/CreateNewStore";
import ListOfStore from "./container/Store/ListOfStore";

ReactDOM.render(<CreateNewStore />, document.getElementById("CreateNewStore"));
ReactDOM.render(<ListOfStore />, document.getElementById("ListOfStore"));