const connectToDB = require("../config.js/db");

const getParcels = async () => {
  const db = await connectToDB();
  const parcelCollections = db.collection("parcelCollections");
  return await parcelCollections.find({}).toArray();
};

const parcelPost = async (parcel) => {
  const db = await connectToDB();
  const parcelCollections = db.collection("parcelCollections");
  return await parcelCollections.insertOne(parcel);
};

module.exports = {
  getParcels,
  parcelPost,
};
