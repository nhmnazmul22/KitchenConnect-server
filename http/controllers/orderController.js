import * as OrderService from "../services/orderServices.js";

export const getOrders = async (req, res) => {
  try {
    const result = await OrderService.getOrdersService(req);
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Orders retrieved failed",
      data: null,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const result = await OrderService.getMyOrdersService(req);
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Orders retrieved failed",
      data: null,
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const result = await OrderService.getOrderDetails(req);
    return res.status(200).json({
      success: true,
      message: "Order retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Order retrieved failed",
      data: null,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const result = await OrderService.createOrderService(req);
    return res.status(201).json({
      success: true,
      message: "Order created successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Order created failed",
      data: null,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const result = await OrderService.updateOrderService(req);
    return res.status(202).json({
      success: true,
      message: "Order updated successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Order updated failed",
      data: null,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const result = await OrderService.updateOrderStatusService(req);
    return res.status(202).json({
      success: true,
      message: "Order status updated successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Order status updated failed",
      data: null,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const result = await OrderService.deleteOrderService(req);
    return res.status(200).json({
      success: true,
      message: "Order deleted successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Order deleted failed",
      data: null,
    });
  }
};
