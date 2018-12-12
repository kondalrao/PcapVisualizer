import React, { Component } from "react";
import stringifyObject from "stringify-object-es5";

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.layers = this.props.layers;
    this.convert = {
      bin2dec: s => parseInt(s, 2).toString(10),
      bin2hex: s => parseInt(s, 2).toString(16),
      dec2bin: s => parseInt(s, 10).toString(2),
      dec2hex: s => parseInt(s, 10).toString(16),
      hex2bin: s => parseInt(s, 16).toString(2),
      hex2dec: s => parseInt(s, 16).toString(10)
    };
  }

  render() {
    var data = [];
    var idx = 0;
    var row = 0;
    var col = 0;
    var ldata = [];
    var lidx = 0;

    for (let [k, v] of Object.entries(this.layers)) {
      if (k == 0) continue;

      // console.log("Data", v.name);
      var str_list = v.raw.match(/..?/g);

      // console.log(v.raw.length, str_list);

      for (lidx = 0; lidx < str_list.length; lidx++, idx++) {
        if (idx % 16 == 0) {
          if (row != 0) {
            // console.log("adding row:", row);
            data.push(<tr>{ldata}</tr>);
            ldata = [];
          }
          ldata.push(<td style={{ backgroundColor: "grey" }}>{String(row).padStart(3, "0") + "0"}</td>);
          row++;
        }
        // console.log(idx, idx % 16, str_list[lidx]);
        ldata.push(<td style={{ backgroundColor: v.dcolor }}>{str_list[lidx]}</td>);
      }
      // break;
    }
    data.push(<tr>{ldata}</tr>);

    return (
      <table style={{ border: 1 }}>
        <tbody>{data}</tbody>
      </table>
    );
  }
}
