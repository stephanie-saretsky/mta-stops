import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Header from "./Header.jsx";
import Homepage from "./Homepage.jsx";
import StopTimes from "./StopTimes.jsx";

class UnconnectedApp extends Component {
  renderStopTimes = routerData => {
    console.log(routerData, "THE DATA");
    let stopId = routerData.match.params.sid;
    console.log(stopId, "STOP ID");
    return (
      <div>
        <StopTimes stopId={stopId} />
      </div>
    );
  };

  renderHomepage = () => {
    return <Homepage />;
  };

  render = () => {
    return (
      <div>
        <Header />
        <Route exact={true} path="/" render={this.renderHomepage} />
        <Route exact={true} path="/stop/:sid" render={this.renderStopTimes} />
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
