import Stripe from "stripe";
import { createError } from "../../lib/helper.js";
import { collections } from "../../config/db.js";
import { ObjectId } from "mongodb";

const StripeInstance = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentSessionService = async (req) => {
  const { orderId } = req.body;

  if (!orderId) {
    throw createError("Order Id is required", 422);
  }

  const ordersColl = await collections.orders();
  const existOrder = await ordersColl.findOne({ _id: new ObjectId(orderId) });

  if (!existOrder) {
    throw createError("Order not found", 404);
  }

  if (existOrder.orderStatus !== "accepted") {
    throw createError(
      "Order not accepted, Please wait for chef acceptance",
      422
    );
  }

  const session = await StripeInstance.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "bdt",
          unit_amount: existOrder.price * 100,
          product_data: {
            name: `Please pay for: ${existOrder.mealName}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      orderId: orderId,
      mealName: existOrder.mealName,
    },
    customer_email: existOrder.userEmail,
    success_url: `${process.env.SITE_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_DOMAIN}/payment-cancelled?session_id={CHECKOUT_SESSION_ID}`,
  });

  return {
    redirectUrl: session.url,
  };
};

export const paymentSuccessService = async (req, res) => {
  const sessionId = req.query.session_id;
  const session = await StripeInstance.checkout.sessions.retrieve(sessionId);

  const transactionId = session.payment_intent;
  const paymentColl = await collections.payments();
  const paymentExist = await paymentColl.findOne({ txnId: transactionId });
  if (paymentExist) {
    return {
      transactionId,
      orderId: session.metadata.orderId,
    };
  }

  if (session.payment_status !== "paid") {
    throw createError("Payment failed", 500);
  }

  const orderId = session.metadata.orderId;
  const query = { _id: new ObjectId(orderId) };
  const update = {
    $set: {
      paymentStatus: "paid",
      orderStatus: "delivered",
    },
  };

  const ordersColl = await collections.orders();
  const result = await ordersColl.updateOne(query, update);

  const payment = {
    amount: session.amount_total / 100,
    currency: session.currency,
    customerEmail: session.customer_email,
    orderId: session.metadata.orderId,
    mealName: session.metadata.mealName,
    txnId: session.payment_intent,
    paymentStatus: session.payment_status,
    paidAt: new Date(),
  };

  const resultPayment = await paymentColl.insertOne(payment);

  return {
    modifyParcel: result,
    transactionId: session.payment_intent,
    paymentInfo: resultPayment,
  };
};

export const paymentCancelService = async (req) => {
  const sessionId = req.query.session_id;
  const session = await StripeInstance.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "unpaid") {
    throw createError("Payment cancelled failed", 500);
  }

  const orderId = session.metadata.orderId;
  const query = { _id: new ObjectId(orderId) };
  const update = {
    $set: {
      paymentStatus: "unpaid",
    },
  };

  const ordersColl = await collections.orders();
  const result = await ordersColl.updateOne(query, update);

  return {
    modifyOrder: result,
    redirectUrl: session.url,
  };
};
