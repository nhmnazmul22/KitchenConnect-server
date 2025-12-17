import * as MealService from "../services/mealServices.js";

export const getMeals = async (req, res) => {
  try {
    const result = await MealService.getMealsService(req);
    return res.status(200).json({
      success: true,
      message: "Meals retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meals retrieved failed",
      data: null,
    });
  }
};

export const getChefMeals = async (req, res) => {
  try {
    const result = await MealService.getChefMealsService(req);
    return res.status(200).json({
      success: true,
      message: "Meals retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meals retrieved failed",
      data: null,
    });
  }
};

export const getMealDetails = async (req, res) => {
  try {
    const result = await MealService.getMealDetails(req);
    return res.status(200).json({
      success: true,
      message: "Meal retrieved successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal retrieved failed",
      data: null,
    });
  }
};

export const createMeal = async (req, res) => {
  try {
    const result = await MealService.createMealService(req);
    return res.status(201).json({
      success: true,
      message: "Meal create successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal create failed",
      data: null,
    });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const result = await MealService.updateMealService(req);
    return res.status(202).json({
      success: true,
      message: "Meal updated successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal updated failed",
      data: null,
    });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const result = await MealService.deleteMealService(req);
    return res.status(200).json({
      success: true,
      message: "Meal deleted successful",
      data: result,
    });
  } catch (err) {
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Meal deleted failed",
      data: null,
    });
  }
};
