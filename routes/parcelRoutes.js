const express = require("express");

const { getParcels, parcelPost } = require("../controllers/parcelController");

const router = express.Router();

router.get("/", getParcels);
router.post("/", parcelPost);

module.exports = router;
