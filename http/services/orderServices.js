import { ObjectId } from "mongodb";
import { collections } from "../../config/db.js";
import { getDateTime } from "../../lib/utils.js";
import { createError, handleQuery } from "../../lib/helper.js";

export const getOrdersService = async (req) => {
  const authInfo = req.headers.userInfo;
  const ordersColl = await collections.orders();
  const result = await handleQuery(
    req,
    ordersColl,
    ["mealName", "paymentStatus", "orderStatus"],
    {
      chefId: authInfo.chefId,
    }
  );

  if (result.length === 0) {
    throw createError("Orders Not found", 404);
  }
  const total = await result.length;
  return {
    orders: result,
    total,
  };
};

export const getMyOrdersService = async (req) => {
  const authInfo = req.headers.userInfo;
  const ordersColl = await collections.orders();
  const result = await handleQuery(
    req,
    ordersColl,
    ["mealName", "paymentStatus", "orderStatus"],
    {
      userEmail: authInfo.email,
    }
  );

  if (result.length === 0) {
    throw createError("Orders Not found", 404);
  }
  return {
    orders: result,
    total: result.length,
  };
};

export const getOrderDetails = async (req) => {
  const { orderId } = req.params;
  const ordersColl = await collections.orders();

  const order = await ordersColl.findOne({ _id: new ObjectId(orderId) });
  if (!order) {
    throw createError("Order details not found", 404);
  }
  return order;
};

export const createOrderService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const ordersColl = await collections.orders();

  if (!body.mealId || !body.quantity || !body.userAddress) {
    throw createError("mealId, quantity, address is required", 422);
  }

  const mealsColl = await collections.meals();
  const existMeal = await mealsColl.findOne({
    _id: new ObjectId(body.mealId),
  });

  if (!existMeal) {
    throw createError("Meal not found", 404);
  }

  const OrderInfo = {
    mealId: body.mealId,
    mealName: existMeal.foodName,
    price: Number(existMeal.price) * Number(body.quantity),
    quantity: body.quantity,
    chefId: existMeal.chefId,
    paymentStatus: "pending",
    userEmail: authInfo.email,
    userAddress: body.userAddress,
    orderStatus: "pending",
    createdAt: getDateTime(),
  };
  const result = await ordersColl.insertOne(OrderInfo);
  return result;
};

export const updateOrderService = async (req) => {
  const body = req.body;
  const { orderId } = req.params;
  const ordersColl = await collections.orders();

  const query = { _id: new ObjectId(orderId) };
  const existOrder = await ordersColl.findOne(query);

  if (!existOrder) {
    throw createError("Order not found", 404);
  }

  const mealsColl = await collections.meals();
  const existMeal = await mealsColl.findOne({
    _id: new ObjectId(existOrder.mealId),
  });

  if (!existMeal) {
    throw createError("Meal not found", 404);
  }

  const updatedDoc = {
    $set: {
      price: body.quantity
        ? Number(existMeal.price) * Number(body.quantity)
        : existOrder.price,
      quantity: body.quantity || existOrder.quantity,
      userAddress: body.userAddress || existOrder.userAddress,
    },
  };
  const result = await ordersColl.updateOne(query, updatedDoc);
  return result;
};

export const updateOrderStatusService = async (req) => {
  const body = req.body;
  const { orderId } = req.params;
  const ordersColl = await collections.orders();

  const query = { _id: new ObjectId(orderId) };
  const existOrder = await ordersColl.findOne(query);

  if (!existOrder) {
    throw createError("Order not found", 404);
  }

  const updatedDoc = {
    $set: {
      orderStatus: body.orderStatus || existOrder.orderStatus,
    },
  };
  const result = await ordersColl.updateOne(query, updatedDoc);
  return result;
};

export const deleteOrderService = async (req) => {
  const { orderId } = req.params;
  const ordersColl = await collections.orders();

  const query = { _id: new ObjectId(orderId) };
  const existOrder = await ordersColl.findOne(query);

  if (!existOrder) {
    throw createError("Order not found", 404);
  }
  const result = await ordersColl.deleteOne(query);
  return result;
};
