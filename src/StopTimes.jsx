import React, { Component } from "react";
// import "./details.css";
import { Link } from "react-router-dom";
let path = "http://localhost:4000/";

class StopTimes extends Component {
  constructor() {
    super();
    this.state = {
      stopTimes: []
    };
  }

  componentDidMount = () => {
    console.log("rendering stops");
    let stopId = this.props.stopId;
    console.log(stopId, "stop id");
    let data = new FormData();
    data.append("stopId", stopId);
    fetch(path + "stop-times", {
      method: "POST",
      body: data
    })
      .then(header => {
        return header.text();
      })
      .then(body => {
        console.log(body, "WHAT I RECEIVED");
        let parsed = JSON.parse(body);
        console.log(parsed, "now parsed");
        if (parsed.success) {
          this.setState({ stopTimes: parsed.times });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render = () => {
    console.log(this.state.times, "TIMES");
    return (
      <div>
        hi
        {/* {this.state.times.arrival_time}
        {this.state.times.departure_time} */}
      </div>
    );
  };
}

export default StopTimes;
