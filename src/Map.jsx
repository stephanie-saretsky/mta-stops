import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import StopInfo from "./StopInfo.jsx";
// import PolylineOverlay from "./Routes.jsx";

class UnconnectedMap extends Component {
  state = {
    viewport: {
      height: "100vh",
      width: "100vw",
      latitude: 40.7081,
      longitude: -73.9571,
      zoom: 12
    },
    popupInfo: null
    // shapes: []
  };

  // renderShapes = s => {
  //   let map = this.ReactMapGL.getMap();
  //   map.on("load", () => {
  //     map.addLayer({
  //       id: "route",
  //       type: "line",
  //       source: {
  //         type: "geojson",
  //         data: s
  //       },
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round"
  //       },
  //       paint: {
  //         "line-color": "#888",
  //         "line-width": 8
  //       }
  //     });
  //   });
  // };

  renderMarker = s => {
    return (
      <Marker
        latitude={s.stop_lat}
        longitude={s.stop_lon}
        offsetLeft={-20}
        offsetTop={-45}
      >
        <img
          src="/map.png"
          height="25"
          onClick={() => this.setState({ popupInfo: s })}
        />
      </Marker>
    );
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          className="map-popup"
          tipSize={5}
          anchor="top"
          longitude={popupInfo.stop_lon}
          latitude={popupInfo.stop_lat}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <StopInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    return (
      <div className="map">
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1Ijoic25zYXJldHNreSIsImEiOiJjangxd3k2cWowMXN1NDludnlid3Z1ZTVqIn0.tw_4NyX6cV8qF2ZnES065g"
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {this.props.stops.map(this.renderMarker)}
          {this.renderPopup()}
          {/* {this.props.shapes.map(this.renderShapes)} */}
        </ReactMapGL>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { stops: state.stops, shapes: state.shapes };
};

let Map = connect(mapStateToProps)(UnconnectedMap);

export default Map;
