// src/index.ts
import * as ReactDOM from "react-dom/client";
import React from "react";
import Page from "./App";
// @ts-expect-error Ignore CSS import
import content from "./index.css";

// Create a <style> element and append the CSS content
const style = document.createElement("style");
style.innerText = content;

// Create the root div and set its attributes
const root = document.createElement("div");
root.id = "root";
root.setAttribute("style", "z-index:999;");

document.head.appendChild(style);
document.body.appendChild(root);

// Render the React Page component
const rootElement = ReactDOM.createRoot(root);
rootElement.render(React.createElement(Page));
