const express = require("express");

const router = express.Router();
const parcelRoute = require("./parcelRoutes");

router.get("/", (req, res) => {
  res.send("server is running successfully");
});

router.use("/parcels", parcelRoute);

module.exports = router;
