const Stripe = require("stripe");
const paymentService = require("../service/paymentService");
const { ObjectId } = require("mongodb");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutSessionPost = async (req, res) => {
  try {
    const paymentInfo = req.body;
    const amount = parseInt(paymentInfo.cost) * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: `please pay for : ${paymentInfo.parcelName}`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: paymentInfo.senderEmail,
      mode: "payment",
      metadata: {
        parcelId: paymentInfo.parcelId,
      },
      success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-canceled`,
    });

    console.log(" Stripe Session Created:", session.id);

    // const sessionData = {
    //   sessionId: session.id,
    //   parcelId: paymentInfo.parcelId.toString(),
    //   amount: amount / 100,
    //   senderEmail: paymentInfo.senderEmail,
    // };

    // const result = await paymentService.checkoutSessionPost(sessionData);
    // console.log(session);
    res.send({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

const checkoutSessionGet = async (req, res) => {
  try {
    const result = await paymentService.checkoutSessionGet();
    res.send(result);
  } catch (error) {
    console.log("checkoutSessionGet error", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

const paymentSuccessPatch = async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const id = session.metadata.parcelId;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          paymentStatus: "paid",
        },
      };
      const result = await paymentService.paymentSuccessPatch(query, updateDoc);

      return res.send({
        success: true,
        result,
        payment: {
          amount: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: session.payment_status,
        },
      });
    }

    res.send({
      success: false,
      message: "Payment is not completed",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "payment success patch error" });
  }
};
module.exports = {
  checkoutSessionPost,
  checkoutSessionGet,
  paymentSuccessPatch,
};
