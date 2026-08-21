const connectToDB = require("../config.js/db");

const checkoutSessionPost = async (sessionData) => {
  const db = await connectToDB();
  const paymentCollections = db.collection("paymentCollections");

  const result = await paymentCollections.insertOne({
    ...sessionData,
    createdAt: new Date(),
    status: "pending",
  });
  return result;
};
const checkoutSessionGet = async () => {
  const db = await connectToDB();
  const paymentCollections = db.collection("paymentCollections");
  const result = await paymentCollections.find({}).toArray();
  return result;
};
const paymentSuccessPatch = async (query, updateDoc) => {
  const db = await connectToDB();
  const paymentCollections = db.collection("parcelCollections");
  const result = await paymentCollections.updateOne(query, updateDoc);
  return result;
};

module.exports = {
  checkoutSessionPost,
  checkoutSessionGet,
  paymentSuccessPatch,
};
