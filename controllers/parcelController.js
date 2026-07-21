const parcelService = require("../service/parcelService");

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
    const result = await parcelService.parcelPost(parcel);
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "failed to parcel post fetch" });
  }
};

module.exports = {
  getParcels,
  parcelPost,
};
