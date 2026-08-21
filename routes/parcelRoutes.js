const express = require("express");

const {
  getParcels,
  parcelPost,
  parcelDelete,
  getParcel,
  parcelPatch,
} = require("../controllers/parcelController");

const router = express.Router();

router.get("/", getParcels);
router.get("/:id", getParcel);

router.post("/", parcelPost);
router.delete("/:id", parcelDelete);
router.patch("/:id", parcelPatch);

module.exports = router;
