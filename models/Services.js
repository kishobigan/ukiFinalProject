const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceStationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = Service = mongoose.model("service", ServiceStationSchema);
