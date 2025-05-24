const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    const order = await orderCollection.findById(orderId);

    if (order) {
      order.payment = true;
      order.status = "processing";
      await order.save();
      console.log("✅ Order marked as paid:", orderId);
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    const order = await orderCollection.findById(orderId);

    if (order) {
      order.payment = false;
      order.status = "canceled";
      await order.save();
      console.log("❌ Order expired/canceled:", orderId);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();
});

module.exports = router;
