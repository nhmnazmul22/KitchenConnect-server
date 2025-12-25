import { ObjectId } from "mongodb";
import { getDateTime } from "../../lib/utils.js";
import { createError, handleQuery } from "../../lib/helper.js";
import { updateMealRating } from "./mealServices.js";
import { collections } from "../../config/db.js";

export const getReviewsService = async (req) => {
  const authInfo = req.headers.userInfo;
  const reviewsColl = await collections.reviews();

  const result = await handleQuery(req, reviewsColl, ["reviewerName"], {
    userEmail: authInfo.email,
  });

  if (result.length === 0) {
    throw createError("Reviews Not found", 404);
  }
  return result;
};

export const getReviewsByFoodIdService = async (req) => {
  const { mealId } = req.params;
  const reviewsColl = await collections.reviews();
  const cursor = reviewsColl.find({ mealId: mealId }).sort({ createdAt: -1 });
  const result = await cursor.toArray();
  await cursor.close();
  if (result.length === 0) {
    throw createError("Reviews Not found", 404);
  }
  return result;
};

export const getReviewDetailsService = async (req) => {
  const { reviewId } = req.params;
  const reviewsColl = await collections.reviews();

  const result = await reviewsColl.findOne({ _id: new ObjectId(reviewId) });

  if (!result) {
    throw createError("Review Not found", 404);
  }
  return result;
};

export const createReviewService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const reviewsColl = await collections.reviews();

  if (!body.mealId || !body.comment || !body.rating || !body.reviewerName) {
    throw createError("mealId, comment, rating, reviewerName is required", 422);
  }

  const reviewInfo = {
    mealId: body.mealId,
    reviewerName: body.reviewerName,
    reviewerImage: body.reviewerImage || null,
    rating: body.rating,
    comment: body.comment,
    userEmail: authInfo.email,
    createdAt: getDateTime(),
  };

  const result = await reviewsColl.insertOne(reviewInfo);

  // update the food rating
  const [stats] = await reviewsColl
    .aggregate([
      { $match: { mealId: body.mealId } },
      {
        $group: {
          _id: "$mealId",
          avgRating: { $avg: "$rating" },
        },
      },
    ])
    .toArray();

  if (!stats) {
    throw createError("MealId invalid", 422);
  }

  await updateMealRating(body.mealId, stats.avgRating);
  return result;
};

export const updateReviewService = async (req) => {
  const body = req.body;
  const { reviewId } = req.params;
  const reviewsColl = await collections.reviews();

  const query = { _id: new ObjectId(reviewId) };
  const existReview = await reviewsColl.findOne(query);

  if (!existReview) {
    throw createError("Review not found", 404);
  }

  const updatedDoc = {
    $set: {
      reviewerName: body.reviewerName || existReview.reviewerName,
      reviewerImage: body.reviewerImage || existReview.reviewerImage,
      rating: body.rating || existReview.rating,
      comment: body.comment || existReview.comment,
    },
  };
  const result = await reviewsColl.updateOne(query, updatedDoc);

  // update the food rating
  if (body.rating) {
    const [stats] = await reviewsColl
      .aggregate([
        { $match: { mealId: existReview.mealId } },
        {
          $group: {
            _id: "$mealId",
            avgRating: { $avg: "$rating" },
          },
        },
      ])
      .toArray();

    if (!stats) {
      throw createError("Meal Id invalid", 422);
    }
    await updateMealRating(existReview.mealId, stats.avgRating);
  }

  return result;
};

export const deleteReviewService = async (req) => {
  const { reviewId } = req.params;
  const reviewsColl = await collections.reviews();

  const query = { _id: new ObjectId(reviewId) };
  const existReview = await reviewsColl.findOne(query);

  if (!existReview) {
    throw createError("Review not found", 404);
  }

  // update the food rating
  const [stats] = await reviewsColl
    .aggregate([
      { $match: { mealId: existReview.mealId } },
      {
        $group: {
          _id: "$mealId",
          avgRating: { $avg: "$rating" },
        },
      },
    ])
    .toArray();

  if (!stats) {
    throw createError("Meal Id invalid", 422);
  }
  await updateMealRating(existReview.mealId, stats.avgRating);
  const result = await reviewsColl.deleteOne(query);
  return result;
};
