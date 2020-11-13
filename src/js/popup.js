import "../css/popup.css";
import React from "react";
import Main from "./popup/Main"
import { render } from "react-dom";

render(
  <Main/>,
  window.document.getElementById("app-container")
);