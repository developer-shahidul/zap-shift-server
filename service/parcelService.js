const connectToDB = require("../config.js/db");
const { ObjectId } = require("mongodb");

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

const parcelDelete = async (id) => {
  const db = await connectToDB();
  const query = { _id: new ObjectId(id) };
  const parcelCollections = db.collection("parcelCollections");
  return await parcelCollections.deleteOne(query);
};

const getParcel = async (id) => {
  const db = await connectToDB();
  const parcelCollections = db.collection("parcelCollections");
  const query = { _id: new ObjectId(id) };
  return await parcelCollections.findOne(query);
};

const parcelPatch = async (id, status) => {
  const db = await connectToDB();
  const parcelCollections = db.collection("parcelCollections");
  const query = { _id: new ObjectId(id) };
  const updateDocs = {
    $set: {
      deliveryStatus: status,
    },
  };
  return await parcelCollections.updateOne(query, updateDocs);
};

module.exports = {
  getParcels,
  parcelPost,
  parcelDelete,
  getParcel,
  parcelPatch,
};
