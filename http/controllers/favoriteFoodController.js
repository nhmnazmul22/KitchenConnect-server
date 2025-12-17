import * as FavoriteFoodService from "../services/favoriteFoodService.js";

export const getFavoriteMeals = async (req, res) => {
  try {
    const result = await FavoriteFoodService.getFavoriteMealsService(req);
    return res.status(200).json({
      success: true,
      message: "Favorite Meals retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Favorite Meals retrieved failed",
      data: null,
    });
  }
};

export const getFavoriteMealDetails = async (req, res) => {
  try {
    const result = await FavoriteFoodService.getFavoriteMealDetails(req);
    return res.status(200).json({
      success: true,
      message: "Favorite meal retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Favorite meal retrieved failed",
      data: null,
    });
  }
};

export const createFavoriteMeal = async (req, res) => {
  try {
    const result = await FavoriteFoodService.createFavoriteMealService(req);
    return res.status(201).json({
      success: true,
      message: "Meal added to favorite",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal failed to add favorite ",
      data: null,
    });
  }
};

export const deleteFavoriteMeal = async (req, res) => {
  try {
    const result = await FavoriteFoodService.deleteFavoriteMealService(req);
    return res.status(200).json({
      success: true,
      message: "Meal successfully deleted from favorite",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal failed to deleted from favorite",
      data: null,
    });
  }
};
