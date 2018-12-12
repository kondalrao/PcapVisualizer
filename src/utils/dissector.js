import { generate_summary } from "./dissector-summary";

export default class Dissector {
  constructor(pkt) {
    this.pkt = pkt;
    this.layers = this.pkt.layers;
    this.frame = this.layers.frame;
    this.frame_protocols = this.frame.frame_frame_protocols.split(":");
    this.protocol_idx = 0;
    this.dissect = {};
    this.skipProtocols = ["ethertype"];

    this.dissect_layers();
  }

  dissect_layers() {
    var idx = 0;

    this.add_layer(idx++, "frame");
    for (var protocol of this.frame_protocols) {
      if (this.skipProtocols.includes(protocol)) continue;
      this.add(idx++, protocol);
    }
  }

  add_layer(pidx, name, idx = null) {
    const raw = idx == null ? this.layers[name + "_raw"] : this.layers[name + "_raw"][idx];
    const data = idx == null ? this.layers[name] : this.layers[name][idx];

    // console.log(name, data);

    this.dissect[this.protocol_idx] = {
      idx: pidx,
      name: name,
      raw: raw,
      data: data,
      summary: generate_summary(name, data)
    };
    this.protocol_idx++;
  }

  getIndex(protocol, layer) {
    // Find if there is an entry with this name.
    // If so, return the last index and the object.

    var idx = 0;
    for (var pidx of Object.keys(this.dissect)) {
      // console.log(idx, this.dissect[pidx].name, protocol);
      if (this.dissect[pidx].name === protocol) idx++;
    }

    return idx;
  }

  add(pidx, protocol) {
    // console.log("Adding protocol:", protocol);
    // console.log(this.layers[protocol + "_raw"]);

    if (Array.isArray(this.layers[protocol])) {
      var idx = this.getIndex(protocol, this.layers[protocol]);
      this.add_layer(pidx, protocol, idx);
    } else {
      this.add_layer(pidx, protocol);
    }

    return this.dissect;
  }
}
