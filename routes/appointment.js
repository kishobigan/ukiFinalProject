const express = require("express");
const passport = require("passport");

const Appointment = require("../models/Appointments");

const router = express.Router();

router.get(
  "/list/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.find({$and:[{userId:req.params.id}, {accepted:true}]})
      .then((appointment) => {
        if (!appointment) {
          return res.json({ error: "No appointments found" });
        }
        return res.json(appointment);
      })

      .catch((err) => console.log("Error finding appointments: " + err));
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newAppointment = new Appointment({
      userId:req.body.userId,
      vehileNumber: req.body.vehileNumber,
      vehileType: req.body.vehileNumber,
      driverName: req.body.driverName,
      phoneNumber: req.body.phoneNumber,
      userEmail: req.body.userEmail,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description
    });

    Appointment.create(newAppointment,(err, data)=> {
      if(err){
        res.json({appointment})
      }
      else{
        res.json({error: "Error adding appointment"})
      }
    })
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.findOne({ _id: req.params.id })
      .then((appointment) => {
        // if user id matches
        if (appointment.user.toString() === req.user.id.toString()) {
          // removing
          appointment
            .remove()
            .then(() => res.json({ success: true }))
            .catch((err) =>
              res.status(404).json({ error: "Error deleting appointment" })
            );
        }
      })
      .catch((err) =>
        res.status(404).json({ error: "Error deleting appointment" })
      );
  }
);

module.exports = router;
