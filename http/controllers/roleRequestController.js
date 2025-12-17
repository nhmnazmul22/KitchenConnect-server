import * as RoleRequestService from "../services/roleRequestServices.js";

export const getRoleRequests = async (req, res) => {
  try {
    const result = await RoleRequestService.getRoleRequests(req);
    return res.status(200).json({
      success: true,
      message: "Role request retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Role request retrieved failed",
      data: null,
    });
  }
};

export const createRoleRequest = async (req, res) => {
  try {
    const result = await RoleRequestService.createRoleRequestService(req);
    return res.status(201).json({
      success: true,
      message: "Role request created successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Role request created failed",
      data: null,
    });
  }
};

export const updateRoleRequest = async (req, res) => {
  try {
    const result = await RoleRequestService.updateRoleRequestService(req);
    return res.status(202).json({
      success: true,
      message: "Role request updated successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Role request updated failed",
      data: null,
    });
  }
};
