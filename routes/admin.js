const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Service = require("../models/Services");
const User = require("../models/Users");
const appointments = require("../models/Appointments");

const router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    const { name, email, password, isAdmin } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (user) {
          // user already present error
          return res.status(400).json({ error: "Email is already registered" });
        } else {
          // New user creation
          const newUser = new User({
            name,
            email,
            password,
            isAdmin,
          });

          // Encrypting password using bcryptjs
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              // Handling error
              if (err) {
                throw err;
              }
              newUser.password = hash;

              // Storing to db
              newUser
                .save()
                .then(({ email, name, id, isAdmin }) =>
                  res.json({ email, name, id, isAdmin })
                )
                // Error saving to db
                .catch((err) => console.log(err));
            });
          });
        }
      })
      // Error finding user in db
      .catch((err) => console.log(err));
  }
);

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    User.find({ isAdmin: true }, ["name", "email", "_id", "isAdmin"])
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

router.get(
  "/appointments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    appointments.find()
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

router.delete(
  "/appointment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    appointments.findOne({ _id: req.params.id })
      .then((user) => {
        user
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error deleting admin" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error deleting admin" }));
  }
);

router.put(
  "/accept/:id",
  (req, res) => {
    appointments.findByIdAndUpdate({ _id: req.params.id }, {accepted:true})
      .then((user) => {
        appointments
          .updateOne()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error accept" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error accept" }));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    User.findOne({ _id: req.params.id })
      .then((user) => {
        user
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error deleting admin" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error deleting admin" }));
  }
);

router.post(
  "/service/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    const { name, district, address } = req.body;
    const newService = new Service({ name, district, address });
    newService
      .save()
      .then((service) => res.json(service))
      .catch((err) => res.json({ error: "Error saving service information" }));
  }
);

router.delete(
  "/services/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json({ error: "You are not an admin" });
    }
    Service.findOne({ _id: req.params.id })
      .then((service) => {
        // removing
        service
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) =>
            res.status(404).json({ error: "Error deleting service" })
          );
      })
      .catch((err) => res.status(404).json({ error: "Error deleting service" }));
  }
);
module.exports = router;
