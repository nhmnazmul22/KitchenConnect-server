import * as UserServices from "../services/userServices.js";

export const getUsers = async (req, res) => {
  try {
    const result = await UserServices.getUsers(req);
    return res.status(200).json({
      success: true,
      message: "User retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "User retrieved failed",
      data: null,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const result = await UserServices.createUserService(req);
    return res.status(201).json({
      success: true,
      message: "User create successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "User create failed",
      data: null,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await UserServices.updateUserService(req);
    return res.status(202).json({
      success: true,
      message: "User update successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "User update failed",
      data: null,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await UserServices.getProfileService(req);
    return res.status(200).json({
      success: true,
      message: "Profile retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Profile retrieved failed",
      data: null,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const result = await UserServices.updateProfileService(req);
    return res.status(202).json({
      success: true,
      message: "User update successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "User update failed",
      data: null,
    });
  }
};
