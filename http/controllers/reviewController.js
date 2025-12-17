import * as ReviewsService from "../services/reviewServices.js";

export const getReviews = async (req, res) => {
  try {
    const result = await ReviewsService.getReviewsService(req);
    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Reviews retrieved failed",
      data: null,
    });
  }
};

export const getReviewsByFoodId = async (req, res) => {
  try {
    const result = await ReviewsService.getReviewsByFoodIdService(req);
    return res.status(200).json({
      success: true,
      message: "Reviews retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Reviews retrieved failed",
      data: null,
    });
  }
};

export const getReviewDetails = async (req, res) => {
  try {
    const result = await ReviewsService.getReviewDetailsService(req);
    return res.status(200).json({
      success: true,
      message: "Review retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Review retrieved failed",
      data: null,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const result = await ReviewsService.createReviewService(req);
    return res.status(201).json({
      success: true,
      message: "Review create successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Review create failed",
      data: null,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const result = await ReviewsService.updateReviewService(req);
    return res.status(202).json({
      success: true,
      message: "Review updated successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Review updated failed",
      data: null,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const result = await ReviewsService.deleteReviewService(req);
    return res.status(200).json({
      success: true,
      message: "Review deleted successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Review deleted failed",
      data: null,
    });
  }
};
