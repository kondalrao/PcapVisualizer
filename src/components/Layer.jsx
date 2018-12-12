import React, { Component } from "react";
import stringifyObject from "stringify-object-es5";

export default class Layer extends Component {
  constructor(props) {
    super(props);
    this.key = this.props.id;
    this.layer = this.props.layer;
    // console.log("Layer: ", this.props.layer.color);
  }

  handle_click = e => {
    // console.log("handle_click:", e.type, e.target.style);
    // this.setState({ color: "yellow" });
    this.props.callback(this.key);
  };

  render() {
    // console.log(this.props.layer);
    const name = this.layer.name;
    const raw = this.layer.raw;
    const summary = this.layer.summary;
    const data = this.layer.data;

    return (
      <div style={{ backgroundColor: this.layer.color, display: "inline-block" }} onClick={this.handle_click}>
        <div style={{ padding: "0px 10px" }}>{summary}</div>
      </div>
    );
  }
}
