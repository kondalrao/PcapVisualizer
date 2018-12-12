const summary_dict = {
  ["frame"]: layer => {
    const flen = layer.frame_frame_len;
    const intfId = layer.frame_frame_interface_id;

    const summary = `Frame: ${flen} bytes on wire (${flen * 8} bits), ${flen} bytes captured (${flen *
      8} bits) on interface ${intfId}`;
    return summary;
  },
  ["eth"]: layer => {
    const src = layer.eth_eth_src;
    const rsrc = layer.eth_src_eth_src_resolved;
    const dst = layer.eth_eth_dst;
    const rdst = layer.eth_dst_eth_dst_resolved;

    const summary = `Ethernet II, Src ${rsrc} (${src}), Dst: ${rdst} (${dst})`;
    return summary;
  },
  ["vlan"]: layer => {
    const pri = layer.vlan_vlan_priority;
    const dei = layer.vlan_vlan_dei;
    const id = layer.vlan_vlan_id;

    const summary = `802.1Q Virtual Lan, PRI: ${pri}, DEI: ${dei}, ID: ${id}`;
    return summary;
  },
  ["cisco"]: layer => {
    return "Cisco Protocol";
  },
  ["ip"]: layer => {
    const src = layer.ip_ip_src;
    const dst = layer.ip_ip_dst;

    const summary = `Internet Protocol Version 4, Src: ${src}, Dst: ${dst}`;
    return summary;
  },
  ["tcp"]: layer => {
    return "";
  },
  ["udp"]: layer => {
    const sp = layer.udp_udp_srcport;
    const dp = layer.udp_udp_dstport;

    const summary = `User Datagram Protocol, Src Port: ${sp}, Dst Port: ${dp}`;
    return summary;
  },
  ["data"]: layer => {
    return `Data (${layer.data_data_len})`;
  }
};

export function generate_summary(name, layer) {
  var summary = summary_dict[name](layer);
  // console.log(summary, layer);

  return summary;
}
