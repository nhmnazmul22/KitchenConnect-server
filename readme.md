# KitchenConnect Backend

## Overview

**KitchenConnect Backend** is the backend application for the KitchenConnect platform, a food delivery and meal management system designed to connect local chefs with customers. This backend is built using **Node.js**, **Express**, and **MongoDB** to provide a scalable and efficient API that handles user authentication, meal management, order processing, payments, reviews, and platform analytics.

The goal of this project is to provide a robust, secure, and maintainable backend service that can support a dynamic food ordering platform while keeping all business logic organized using a service-controller pattern.

---

## Features

### User Management

- Register and authenticate users.
- Role-based access control using JWT.
- Manage user profile and details.

### Meal Management

- CRUD operations for meals.
- Search and filter functionality for available meals.

### Favorite Foods

- Users can mark meals as favorites.
- CRUD operations for favorites.

### Order Management

- Create, update, and view orders.
- Track order status.
- Users can view their own orders and history.

### Payments

- Payment integration for meal orders.
- Supports stripe payment method.
- Handles success, failure, and cancellation flows.

### Reviews

- Users can post reviews for meals.
- CRUD operations for reviews.
- Average rating calculation for meals.

### Platform Analytics

- Collect statistics for orders, meals, and users.
- Admins can view platform-wide analytics.

### Role Requests

- Users can request roles (e.g., chef, admin).
- Admin approval workflow for role upgrades.

---

## Why This Backend Exists

The KitchenConnect backend is built to:

1. **Centralize Business Logic**
   All meal, order, and user management processes are handled securely and efficiently on the server-side.

2. **Enable Scalability**
   The service-controller structure allows the platform to scale easily by separating business logic from HTTP handling.

3. **Secure Transactions and Data**
   Authentication, role-based authorization, and payment processing are implemented to ensure data and transaction security.

4. **Support Dynamic Features**
   Features like reviews, favorite meals, and analytics make the platform interactive and useful for both customers and chefs.

---

## Project Structure

```text
├─ config
│  └─ db.js
├─ http
│  ├─ controllers
│  │  ├─ favoriteFoodController.js
│  │  ├─ mealController.js
│  │  ├─ orderController.js
│  │  ├─ paymentController.js
│  │  ├─ platformStatisticsController.js
│  │  ├─ reviewController.js
│  │  ├─ roleRequestController.js
│  │  ├─ tokenController.js
│  │  └─ userController.js
│  ├─ middlewares
│  │  ├─ tokenVerify.js
│  │  └─ verifyRole.js
│  ├─ routes.js
│  └─ services
│     ├─ favoriteFoodService.js
│     ├─ mealServices.js
│     ├─ orderServices.js
│     ├─ paymentService.js
│     ├─ platformStatisticsService.js
│     ├─ reviewServices.js
│     ├─ roleRequestServices.js
│     ├─ tokenServices.js
│     └─ userServices.js
├─ lib
│  ├─ helper.js
│  ├─ token.js
│  └─ utils.js
├─ index.js
├─ .env
├─ .env.example
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ readme.md
├─ todo.txt
└─ vercel.json
```

## Technologies Used

- **Node.js** & **Express** – Backend server and RESTful API
- **MongoDB** (via official MongoDB driver) – NoSQL database for storing users, meals, orders, reviews, etc.
- **JWT (jsonwebtoken)** – Authentication and role-based authorization
- **Stripe** – Payment gateway integration for secure transactions
- **CORS** – Cross-Origin Resource Sharing management
- **Cookie-Parser** – Handling HTTP cookies for token storage
- **dotenv** – Environment variable management
- **Nodemon** – Development server with auto-restart
- **Vercel** (or any preferred platform) – Deployment platform

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nhmnazmul22/KitchenConnect-server.git
cd KitchenConnect-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

**Copy .env.example to .env and configure your credentials:**

```env
PORT=
DATABASE_URI=
DB_NAME=
JWT_SECRET=
NODE_ENV=
STRIPE_SECRET=
SITE_DOMAIN=
```

### 4. Start the server

```bash
npm start
```

**or for development with nodemon**

```bash
npm run dev
```

**Server will run at: http://localhost:{port}**

## API Endpoints

### Public Routes (No Authentication Required)

- `GET /get-token/:userEmail` → Generate and send token for user (via email)
- `POST /users` → User registration
- `GET /meals` → Get all available meals
- `POST /payment-checkout-session` → Create payment checkout session
- `PATCH /payment-success` → Handle successful payment webhook/update
- `PATCH /payment-cancel` → Handle cancelled payment webhook/update

### Authenticated Routes (Requires JWT Token)

#### General Authenticated Routes

- `GET /clear-cookies` → Clear authentication cookies
- `GET /profile` → Get current user profile
- `PUT /profile` → Update current user profile
- `GET /meals/:mealId` → Get specific meal details
- `GET /orders/:orderId` → Get specific order details
- `POST /role-requests` → Submit role upgrade request (e.g., to become chef)
- `GET /platform-statistics` → Get platform analytics (Admin only)

#### User Role Routes (`VerifyIsUser`)

**Reviews**

- `GET /reviews` → Get all reviews (by current user)
- `GET /reviewsByFoodId/:mealId` → Get reviews for a specific meal
- `GET /reviews/:reviewId` → Get single review details
- `POST /create-review` → Create a new review
- `PUT /update-review/:reviewId` → Update a review
- `DELETE /delete-review/:reviewId` → Delete a review

**Favorites**

- `GET /favorite-meals` → Get all favorite meals of current user
- `GET /favorite-meals/:favoriteId` → Get specific favorite meal details
- `POST /favorite-meals` → Add a meal to favorites
- `DELETE /favorite-meals/:favoriteId` → Remove a meal from favorites

**Orders**

- `GET /my-orders` → Get all orders placed by current user
- `POST /orders` → Create a new order
- `PUT /orders/:orderId` → Update an order (limited user actions)

#### Chef Role Routes (`VerifyIsChef`)

**Meals**

- `GET /my-meals` → Get all meals created by the chef
- `POST /meals` → Create a new meal
- `PUT /meals/:mealId` → Update a meal
- `DELETE /meals/:mealId` → Delete a meal

**Orders**

- `GET /orders` → Get all orders received by the chef
- `PUT /order-status/:orderId` → Update order status (e.g., preparing, delivered)
- `DELETE /orders/:orderId` → Delete an order

#### Admin Role Routes (`VerifyIsAdmin`)

**Users**

- `GET /users` → Get all users
- `PUT /users/:userId` → Update any user (admin override)

**Role Requests**

- `GET /role-requests` → Get all role upgrade requests
- `PATCH /role-requests/:requestId` → Approve/reject role upgrade request

## Conclusion

Built by **Nhm Nazmul** using Node.js, Express, MongoDB, and JWT, the project focuses on security, clean code, and easy growth.

Future plans: Add notifications, more payment methods, discounts, and more+.

Thanks for checking it out! Give start on my project if you love it.
