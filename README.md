This is a backend API for a Restaurant Management System where users can register, browse menu items, place orders, and track their status. Admins can manage the menu and customer orders.
It’s built with Node.js, Express.js, and MongoDB, featuring JWT authentication and role-based access control.

**Features**

>>User Features
1.Register & login securely (JWT authentication).
2.Browse available menu items.
3.Place orders from the menu.
4.Track own orders & status.

>>Admin Features
1.Add, update, and delete menu items.
2.View all customer orders.
3.Update order statuses (pending → preparing → completed).

>>Security
1.JWT tokens protect private routes.
2.Passwords are hashed with bcrypt (no plain text storage!).
3.Middleware ensures only admins can perform admin operations.

**Tech Stack**

1.Node.js & Express.js → RESTful API server
2.MongoDB (Mongoose) → Database for users, menu items, and orders
3.JWT (JSON Web Token) → Authentication & authorization
4.bcrypt → Password hashing
5.dotenv → Environment variable management
6.Postman → API testing

**Database Models**

>>User Model
json
{
  "username": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "user | admin"
}

>>Menu Item Model
json
{
  "name": "String",
  "description": "String",
  "price": "Number",
  "category": "String",
  "available": "Boolean"
}

>>Order Model
json
{
  "userId": "ObjectId -> User",
  "items": [
    { "menuItemId": "ObjectId -> MenuItem", "quantity": "Number" }
  ],
  "totalPrice": "Number",
  "status": "pending | preparing | completed",
  "createdAt": "Date"
}

**API Routes**

>>Auth
-POST /api/auth/signup → Register a new user
-POST /api/auth/login → Login & receive JWT

>>Menu
-GET /api/menu → Get all menu items (public)
-POST /api/menu → Add menu item (admin only)
-PUT /api/menu/:id → Update menu item (admin only)
-DELETE /api/menu/:id → Delete menu item (admin only)

>>Orders
-POST /api/orders → Place an order (user only)
-GET /api/orders → View all orders (admin only)
-GET /api/orders/my → View logged-in user’s orders
-PUT /api/orders/:id/status → Update order status (admin only)

**Project Structure**

restaurant-app-backend
├── 📁 config        # Database connection
├── 📁 controllers  # Route logic
├── 📁 middlewares  # Authentication & role-based access
├── 📁 models       # Mongoose schemas
├── 📁 routes       # API endpoints
├── server.js       # Main entry point
└── .env.example    # Sample environment variables

**Installation & Setup**

>>Clone the repository
-git clone https://github.com/shivam0642/RestaurantApp-Backend.git
-cd RestaurantApp-Backend

>>Install dependencies
-npm install

>>Set up environment variables
Create a .env file in the root directory based on .env.example:

-PORT=5000
-MONGO_URI=your-mongodb-url
-JWT_SECRET=your-secret-key

>>Run the server
-npm start

Server runs at: http://localhost:5000


**Example Usage**

>>Signup
POST /api/auth/signup
{
  "username": "shivam",
  "email": "shivam@example.com",
  "password": "mypassword"
}

>>Login
POST /api/auth/login
{
  "email": "shivam@example.com",
  "password": "mypassword"
}

>>Response:
{ "token": "your-jwt-token" }

>>Place Order (User Auth Required)
POST /api/orders
Authorization: Bearer jwt-token-here

{
  "items": [
    { "menuItemId": "64f84b1c12", "quantity": 2 },
    { "menuItemId": "64f84b1c15", "quantity": 1 }
  ]
}

**Why This Is a Strong Backend Project**
-Implements authentication & authorization.
-Uses a real database (MongoDB).
-Features role-based access control (user/admin).
-Covers CRUD operations (Create, Read, Update, Delete).
-Follows a clean RESTful API design.
-Can easily integrate with a frontend (React, Angular) or mobile app.

**License**
This project is licensed under the MIT License – free to use and modify.

