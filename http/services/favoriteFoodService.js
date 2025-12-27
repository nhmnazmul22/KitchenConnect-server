import { ObjectId } from "mongodb";
import { collections } from "../../config/db.js";
import { getDateTime } from "../../lib/utils.js";
import { createError } from "../../lib/helper.js";

export const getFavoriteMealsService = async (req) => {
  const authInfo = req.headers.userInfo;
  const favoritesColl = await collections.favorites();
  const result = await handleQuery(
    req,
    favoritesColl,
    ["foodName", "chefName", "ingredients"],
    {
      userEmail: authInfo.email,
    }
  );
  if (result.length === 0) {
    throw createError("Favorite meals not found", 404);
  }
  return {
    meals: result,
    total: result.length,
  };
};

export const getFavoriteMealDetails = async (req) => {
  const { favoriteId } = req.params;
  const favoritesColl = await collections.favorites();
  const result = await favoritesColl.findOne({ _id: new ObjectId(favoriteId) });
  if (!result) {
    throw createError("Favorite meal not found", 404);
  }
  return result;
};

export const createFavoriteMealService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const favoritesColl = await collections.favorites();

  if (!body.mealId) {
    throw createError("Meal Id is required", 422);
  }

  const mealsColl = await collections.meals();
  const existMeal = await mealsColl.findOne({
    _id: new ObjectId(body.mealId),
  });

  if (!existMeal) {
    throw createError("Meal not found", 422);
  }

  const isExistingFavorite = await favoritesColl.findOne({
    mealId: body.mealId,
    userEmail: authInfo.email,
  });

  if (isExistingFavorite) {
    throw createError("Meal already in your favorite", 422);
  }

  const favoriteMealInfo = {
    mealId: body.mealId,
    mealName: existMeal.foodName,
    chefId: existMeal.chefId,
    chefName: existMeal.chefName,
    price: existMeal.price,
    userEmail: authInfo.email,
    createdAt: getDateTime(),
  };
  const result = await favoritesColl.insertOne(favoriteMealInfo);
  return result;
};

export const deleteFavoriteMealService = async (req) => {
  const { favoriteId } = req.params;

  const favoritesColl = await collections.favorites();
  const query = { _id: new ObjectId(favoriteId) };
  const existFavoriteFood = await favoritesColl.findOne(query);

  if (!existFavoriteFood) {
    throw createError("Favorite meal not found", 404);
  }

  const result = await favoritesColl.deleteOne(query);
  return result;
};
