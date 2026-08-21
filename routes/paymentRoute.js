const express = require("express");

const router = express.Router();

const {
  checkoutSessionPost,
  checkoutSessionGet,
  paymentSuccessPatch,
} = require("../controllers/paymentController");

router.post("/", checkoutSessionPost);
router.get("/", checkoutSessionGet);
router.patch("/payment-success", paymentSuccessPatch);

module.exports = router;
