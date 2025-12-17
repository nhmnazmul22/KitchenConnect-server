import * as PaymentService from "../services/paymentService.js";

export const createPaymentSession = async (req, res) => {
  try {
    const result = await PaymentService.createPaymentSessionService(req);
    return res.status(200).json({
      success: true,
      message: "Payment session creation successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Payment session creation failed",
      data: null,
    });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const result = await PaymentService.paymentSuccessService(req);
    return res.status(200).json({
      success: true,
      message: "Payment successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Payment failed",
      data: null,
    });
  }
};

export const paymentCancel = async (req, res) => {
  try {
    const result = await PaymentService.paymentCancelService(req);
    return res.status(200).json({
      success: true,
      message: "Payment Cancelled",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Something went wrong!",
      data: null,
    });
  }
};
