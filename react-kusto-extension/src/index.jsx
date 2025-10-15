import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const divElement = document.createElement("div");
document.body.appendChild(divElement);

const root = ReactDOM.createRoot(divElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
