import React, { Component } from "react";
import { Link } from "react-router-dom";

class StopInfo extends Component {
  render() {
    let { info } = this.props;
    console.log(info.stop_id, "stop ID");
    return (
      <div>
        <p>
          {info.stop_name}
          {/* |{" "}
          <Link to={"stop/" + info.stop_id}>See Stop Times</Link>{" "} */}
        </p>
      </div>
    );
  }
}

export default StopInfo;
