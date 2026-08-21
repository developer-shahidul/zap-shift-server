const express = require("express");

const router = express.Router();
const parcelRoute = require("./parcelRoutes");
const paymentRoute = require("./paymentRoute");

router.get("/", (req, res) => {
  res.send("server is running successfully");
});

router.use("/parcels", parcelRoute);
router.use("/create-checkout-session", paymentRoute);

module.exports = router;
