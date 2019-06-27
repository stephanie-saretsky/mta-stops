let express = require("express");
let app = express();
let multer = require("multer");
let mongo = require("mongodb");
let gtfs = require("gtfs");
let mongoose = require("mongoose");
let cors = require("cors");
let upload = multer({
  dest: __dirname + "/uploads/"
});
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
let config = {
  mongoUrl: "mongodb://localhost:27017/gtfs",
  agencies: [
    {
      agency_key: "MTA",
      path: "./gtfs/",
      exclude: ["stop_times"]
    }
  ]
};

mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

gtfs
  .import(config)
  .then(() => {
    console.log("Import Successful");
    // return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });

app.get("/stops", (req, res) => {
  gtfs
    .getStops({
      agency_key: "MTA"
    })
    .then(stops => {
      res.send({ success: true, stops: stops });
    })
    .catch(err => {
      console.log(err);
    });
});

// app.get("/shapes", (req, res) => {
//   gtfs
//     .getShapesAsGeoJSON({
//       agency_key: "MTA"
//     })
//     .then(geojson => {
//       res.send({ success: true, shapes: geojson });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.post("/stop-times", upload.none(), (req, res) => {
//   console.log(JSON.stringify(req.body.stopId), "req body");
//   gtfs
//     .getShapesAsGeoJSON({
//       agency_key: "MTA"
//     })
//     .then(geojson => {
//       console.log(geojson, "GEOJSON");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.listen(4000);
