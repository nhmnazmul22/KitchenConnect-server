import * as PlatformStatisticsService from "../services/platformStatisticsService.js";

export const getPlatformStatistics = async (req, res) => {
  try {
    const result = await PlatformStatisticsService.platformStatistics(req);
    return res.status(200).json({
      success: true,
      message: "Platform statistics retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Platform statistics retrieved failed",
      data: null,
    });
  }
};
