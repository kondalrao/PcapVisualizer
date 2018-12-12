import React from "react";
import ReactDOM from "react-dom";

import Packet from "./components/Packet";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Pcap Visualizer</h1>
      <Packet />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
