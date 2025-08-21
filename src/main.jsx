import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Lenis from "lenis";

const lenis = new Lenis({
  smooth: true,
  lerp: 0.1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
