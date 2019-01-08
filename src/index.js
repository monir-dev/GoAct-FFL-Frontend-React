import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Template assets
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "@coreui/coreui/dist/css/coreui.min.css";
// import "@coreui/coreui/dist/js/coreui.min.js";
import "@coreui/coreui/dist/css/coreui-pro.min.css";
import "@coreui/coreui/dist/js/coreui-pro.min.js";
import "@coreui/coreui/dist/js/coreui-utilities.min.js";

import "simple-line-icons/css/simple-line-icons.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
