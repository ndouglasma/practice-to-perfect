import React from "react";
import ReactDOM from "react-dom";
// import '../../../../dist/semantic.min.css';
import 'semantic-ui-css/semantic.min.css';

import Routes from "./routes";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Routes />,
    document.getElementById("ptp-app")
  )
});
