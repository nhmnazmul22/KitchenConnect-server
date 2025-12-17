import express from "express";
import * as userController from "./controllers/userController.js";
import * as tokenController from "./controllers/tokenController.js";
import * as mealController from "./controllers/mealController.js";
import * as reviewController from "./controllers/reviewController.js";
import * as favoriteFoodController from "./controllers/favoriteFoodController.js";
import * as orderController from "./controllers/orderController.js";
import * as paymentController from "./controllers/paymentController.js";
import * as roleRequestController from "./controllers/roleRequestController.js";
import * as platformStatisticsController from "./controllers/platformStatisticsController.js";
import { VerifyToken } from "./middlewares/tokenVerify.js";
import {
  VerifyIsAdmin,
  VerifyIsChef,
  VerifyIsUser,
} from "./middlewares/verifyRole.js";

const routes = express.Router();

// ================== Public Routes  ==================
// Token Routes
routes.get("/get-token/:userEmail", tokenController.getToken);

// User Routes
routes.post("/users", userController.createUser);

// Meals routes
routes.get("/meals", mealController.getMeals);

// Payment routes
routes.post(
  "/payment-checkout-session",
  paymentController.createPaymentSession
);
routes.patch("/payment-success", paymentController.paymentSuccess);
routes.patch("/payment-cancel", paymentController.paymentCancel);

// ================== Public Routes with token ==================
// Token Routes
routes.get("/clear-cookies", VerifyToken, tokenController.clearCookie);

// User Routes
routes.get("/profile", VerifyToken, userController.getProfile);
routes.put("/profile", VerifyToken, userController.updateProfile);

// Meals routes
routes.get("/meals/:mealId", VerifyToken, mealController.getMealDetails);

// Order routes
routes.get("/orders/:orderId", VerifyToken, orderController.getOrderDetails);

// Role Request routes
routes.post(
  "/role-requests",
  VerifyToken,
  roleRequestController.createRoleRequest
);

// Statistics Routes
routes.get(
  "/platform-statistics",
  VerifyToken,
  VerifyIsAdmin,
  platformStatisticsController.getPlatformStatistics
);

// ================== User Routes ==================
// Reviews routes
routes.get("/reviews", VerifyToken, VerifyIsUser, reviewController.getReviews);
routes.get(
  "/reviewsByFoodId/:mealId",
  VerifyToken,
  VerifyIsUser,
  reviewController.getReviewsByFoodId
);
routes.get(
  "/reviews/:reviewId",
  VerifyToken,
  VerifyIsUser,
  reviewController.getReviewDetails
);
routes.post(
  "/create-review",
  VerifyToken,
  VerifyIsUser,
  reviewController.createReview
);
routes.put(
  "/update-review/:reviewId",
  VerifyToken,
  VerifyIsUser,
  reviewController.updateReview
);
routes.delete(
  "/delete-review/:reviewId",
  VerifyToken,
  VerifyIsUser,
  reviewController.deleteReview
);

// Favorite routes
routes.get(
  "/favorite-meals",
  VerifyToken,
  VerifyIsUser,
  favoriteFoodController.getFavoriteMeals
);
routes.get(
  "/favorite-meals/:favoriteId",
  VerifyToken,
  VerifyIsUser,
  favoriteFoodController.getFavoriteMealDetails
);
routes.post(
  "/favorite-meals",
  VerifyToken,
  VerifyIsUser,
  favoriteFoodController.createFavoriteMeal
);
routes.delete(
  "/favorite-meals/:favoriteId",
  VerifyToken,
  VerifyIsUser,
  favoriteFoodController.deleteFavoriteMeal
);

// Order routes
routes.get(
  "/my-orders",
  VerifyToken,
  VerifyIsUser,
  orderController.getMyOrders
);
routes.post("/orders", VerifyToken, VerifyIsUser, orderController.createOrder);
routes.put(
  "/orders/:orderId",
  VerifyToken,
  VerifyIsUser,
  orderController.updateOrder
);

// ================== Chef Routes ==================
// Meals routes
routes.get("/my-meals", VerifyToken, VerifyIsChef, mealController.getChefMeals);
routes.post("/meals", VerifyToken, VerifyIsChef, mealController.createMeal);
routes.put(
  "/meals/:mealId",
  VerifyToken,
  VerifyIsChef,
  mealController.updateMeal
);
routes.delete(
  "/meals/:mealId",
  VerifyToken,
  VerifyIsChef,
  mealController.deleteMeal
);

// Order routes
routes.get("/orders", VerifyToken, VerifyIsChef, orderController.getOrders);
routes.put(
  "/order-status/:orderId",
  VerifyToken,
  VerifyIsChef,
  orderController.updateOrderStatus
);
routes.delete(
  "/orders/:orderId",
  VerifyToken,
  VerifyIsChef,
  orderController.deleteOrder
);

// ================== Admin Routes ==================
// User Routes
routes.get("/users", VerifyToken, VerifyIsAdmin, userController.getUsers);
routes.put(
  "/users/:userId",
  VerifyToken,
  VerifyIsAdmin,
  userController.updateUser
);

// Role Request routes
routes.get(
  "/role-requests",
  VerifyToken,
  VerifyIsAdmin,
  roleRequestController.getRoleRequests
);
routes.patch(
  "/role-requests/:requestId",
  VerifyToken,
  VerifyIsAdmin,
  roleRequestController.updateRoleRequest
);

export default routes;
