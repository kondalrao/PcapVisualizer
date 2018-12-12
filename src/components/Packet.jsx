import React, { Component } from "react";
import Dissector from "../utils/dissector";
import pkts from "../../mockData/test.json";
import stringifyObject from "stringify-object-es5";
import Layer from "./Layer";
import Data from "./Data";

// https://uploads.codesandbox.io/uploads/user/64358f08-514f-43f2-8503-176a854b3dd8/ibHt-test.json

export default class Packet extends Component {
  constructor(props) {
    super(props);
    this.dissector = new Dissector(pkts);
    this.state = {
      layers: this.dissector.dissect
    };

    Object.entries(this.state.layers).map(([k, v]) => (this.state.layers[k].color = "lightgrey"));
    Object.entries(this.state.layers).map(([k, v]) => (this.state.layers[k].dcolor = "white"));
  }

  callback = data => {
    // console.log("callback:", data);
    var layers = this.state.layers;

    Object.entries(layers).map(([k, v]) => (layers[k].color = "lightgrey"));
    Object.entries(layers).map(([k, v]) => (layers[k].dcolor = "white"));

    layers[data].color = "yellow";
    layers[data].dcolor = "yellow";

    this.setState({ layers: layers });
  };

  render() {
    var data = [];
    for (let [k, v] of Object.entries(this.state.layers)) {
      if (k == 0) continue;

      data.push(<span style={{ backgroundColor: v.color }}>{v.raw}</span>);
    }

    return (
      <div>
        <div>This is a First Packet</div>
        <div style={{ background: "yellow" }}>{this.dissector.frame_protocols}</div>

        {Object.entries(this.state.layers).map(([k, v]) => (
          <Layer key={k} id={k} layer={v} callback={this.callback} />
        ))}

        <Data layers={this.state.layers} />
      </div>
    );
  }
}
