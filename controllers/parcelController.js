const { time } = require("node:console");
const parcelService = require("../service/parcelService");
const { ObjectId } = require("mongodb");

const getParcels = async (req, res) => {
  try {
    const result = await parcelService.getParcels();
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, message: "failed to parcel fetch" });
  }
};

const parcelPost = async (req, res) => {
  try {
    const parcel = req.body;
    parcel.createdAt = new Date();
    const result = await parcelService.parcelPost(parcel);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "failed to parcel post fetch" });
  }
};

const parcelDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await parcelService.parcelDelete(id);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "failed to parcel delete fetch" });
  }
};

const getParcel = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await parcelService.getParcel(id);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "failed to parcel get fetch" });
  }
};

module.exports = {
  getParcels,
  parcelPost,
  parcelDelete,
  getParcel,
};
