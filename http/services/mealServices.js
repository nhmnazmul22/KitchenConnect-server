import { ObjectId } from "mongodb";
import { collections } from "../../config/db.js";
import { getDateTime } from "../../lib/utils.js";
import { createError, handleQuery } from "../../lib/helper.js";

export const getMealsService = async (req) => {
  const mealsColl = await collections.meals();
  const result = await handleQuery(req, mealsColl, [
    "foodName",
    "chefName",
    "ingredients",
  ]);
  if (result.length === 0) {
    throw createError("Meals Not found", 404);
  }

  const total = await mealsColl.count();
  return {
    meals: result,
    total,
  };
};

export const getChefMealsService = async (req) => {
  const mealsColl = await collections.meals();
  const authInfo = req.headers.userInfo;
  const result = await handleQuery(
    req,
    mealsColl,
    ["foodName", "ingredients"],
    {
      userEmail: authInfo.email,
    }
  );

  if (result.length === 0) {
    throw createError("Meals Not found", 404);
  }
  return result;
};

export const getMealDetails = async (req) => {
  const { mealId } = req.params;
  const mealsColl = await collections.meals();
  const meal = await mealsColl.findOne({ _id: new ObjectId(mealId) });
  if (!meal) {
    throw createError("Meal Not found", 404);
  }
  return meal;
};

export const createMealService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const mealsColl = await collections.meals();
  if (
    !body.foodName ||
    !body.foodImage ||
    !body.price ||
    !body.estimatedDeliveryTime ||
    !body.deliveryArea
  ) {
    throw createError(
      "Food Name, food image, price, delivery time, delivery area is required",
      422
    );
  }

  const existFood = await mealsColl.findOne({ foodName: body.foodName });

  if (existFood) {
    throw createError("Already have a food on this name", 422);
  }

  const usersColl = await collections.users();
  const chefInfo = await usersColl.findOne({
    _id: new ObjectId(authInfo.userId),
  });

  const mealInfo = {
    foodName: body.foodName,
    chefName: chefInfo.name,
    foodImage: body.foodImage,
    price: body.price,
    rating: 0,
    ingredients: body.ingredients || [],
    estimatedDeliveryTime: body.estimatedDeliveryTime,
    chefExperience: body.chefExperience || "N/A",
    deliveryArea: body.deliveryArea,
    chefId: chefInfo.chefId,
    userEmail: authInfo.email,
    createdAt: getDateTime(),
  };
  const result = await mealsColl.insertOne(mealInfo);
  return result;
};

export const updateMealService = async (req) => {
  const body = req.body;
  const { mealId } = req.params;
  const mealsColl = await collections.meals();

  const query = { _id: new ObjectId(mealId) };
  const existFood = await collection.findOne(query);

  if (!existFood) {
    throw createError("Meal not found", 404);
  }

  const updatedDoc = {
    $set: {
      foodName: body.foodName || existFood.foodName,
      foodImage: body.foodImage || existFood.foodImage,
      price: body.price || existFood.price,
      ingredients: body.ingredients || existFood.ingredients,
      estimatedDeliveryTime:
        body.estimatedDeliveryTime || existFood.estimatedDeliveryTime,
      chefExperience: body.chefExperience || existFood.chefExperience,
      deliveryArea: body.deliveryArea || existFood.deliveryArea,
    },
  };
  const result = await mealsColl.updateOne(query, updatedDoc);
  return result;
};

export const deleteMealService = async (req) => {
  const { mealId } = req.params;
  const mealsColl = await collections.meals();

  const query = { _id: new ObjectId(mealId) };
  const existFood = await mealsColl.findOne(query);

  if (!existFood) {
    throw createError("Meal not found", 404);
  }
  const result = await mealsColl.deleteOne(query);
  return result;
};

export const updateMealRating = async (foodId, avgRating) => {
  const mealsColl = await collections.meals();
  const query = { _id: new ObjectId(foodId) };
  const meal = await mealsColl.findOne(query);
  if (!meal) {
    throw createError("Food Id invalid", 422);
  }

  const result = await mealsColl.updateOne(query, {
    $set: { rating: Number(avgRating.toFixed(1)) },
  });
  return result;
};
