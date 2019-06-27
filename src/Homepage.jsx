import React, { Component } from "react";
import Map from "./Map.jsx";
import Loading from "./Loading.jsx";
import { connect } from "react-redux";
import "./main.css";
let path = "http://localhost:4000/";

class UnconnectedHomepage extends Component {
  componentDidMount = () => {
    fetch(path + "stops", {
      method: "GET"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log(body, "JSON BODY");
        if (body.success) {
          this.props.dispatch({ type: "stop-list", stops: body.stops });
        }
      });
    //   console.log("rendering shapes");
    // fetch(path + "shapes", {
    //   method: "GET"
    // })
    //   .then(x => {
    //     return x.text();
    //   })
    //   .then(responseBody => {
    //     let body = JSON.parse(responseBody);
    //     console.log(body, "JSON BODY");
    //     if (body.success) {
    //       this.props.dispatch({ type: "shapes", shapes: body.shapes });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  render = () => {
    if (this.props.stops.length === 0) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <Map />
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  return { stops: state.stops };
};

let Homepage = connect(mapStateToProps)(UnconnectedHomepage);

export default Homepage;
