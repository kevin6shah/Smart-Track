import "../css/popup.css";
import React from "react";
import Router from "./popup/Router"
import { render } from "react-dom";

render(
  <Router/>,
  window.document.getElementById("app-container")
);