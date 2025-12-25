import * as TokenServices from "../services/tokenServices.js";
import { collections } from "../../config/db.js";

export const getToken = async (req, res) => {
  try {
    const usersColl = await collections.users();
    const isGenerateToken = await TokenServices.generateToken(req, res, usersColl);
    return res.status(200).json({
      success: isGenerateToken,
      message: "Token generate successful",
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Token generate failed",
      token: null,
    });
  }
};

export const clearCookie = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Cookie cleared", data: null });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Something went wrong!",
      token: null,
    });
  }
};
