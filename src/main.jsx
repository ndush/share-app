import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="text-4xl font-medium leading-loose font-sans">
      <App />
    </div>
  </React.StrictMode>
);
