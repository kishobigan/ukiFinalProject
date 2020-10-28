const express = require("express");
const passport = require("passport");

const Service = require("../models/Services");

const router = express.Router();

router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Service.find()
      .then((services) => res.json(services))
      .catch((err) => res.json({ error: "Error fetching services list" }));
  }
);

module.exports = router;
