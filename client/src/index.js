import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import ImageUpload from "./components/Upload/imageUpload";

ReactDOM.render( < ImageUpload / > , document.getElementById("root"));
registerServiceWorker();