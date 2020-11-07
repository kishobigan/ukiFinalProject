const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
  },
  servicName:{type:String},
  vehileNumber:{type:String},
  userId:{type:String},
  vehileType:{type:String},
  driverName:{type:String},
  phoneNumber:{type:String},
  userEmail:{type:String},
  date:{type:String},
  time:{type:String},
  description:{type:String},
  accepted:{type:Boolean, default:false}
});

module.exports = Appointments = mongoose.model(
  "appointments",
  AppointmentsSchema
);
