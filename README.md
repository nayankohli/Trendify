# 🛍️ Trendify

**Trendify** is a fully-featured full-stack e-commerce web application built using **React** for the frontend and **Node.js + MongoDB** for the backend. It includes all core functionalities of a modern e-commerce platform along with a powerful **Admin Portal** for managing products, users, and orders.

---

## 🚀 Features

### 👤 User Features
- User Authentication (Signup, Login)
- Browse Products by Category
- Search & Filter Products
- View Product Details
- Add to Cart / Remove from Cart
- Checkout Process with Order Summary
- View Past Orders
- User Profile Management

### 🔐 Admin Features
- Secure Admin Login
- Dashboard Overview (Sales, Users, Orders)
- Add / Edit / Delete Products
- Manage All Orders (View, Update Status)
- Manage Registered Users
- Upload Product Images

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- React Router
- Context API / Redux
- Tailwind CSS / CSS Modules
- Axios

### 🔹 Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Multer (File Uploads)
- bcrypt.js (Password Hashing)

### 🔹 Tools & Services
- Postman (API Testing)
- Cloudinary or AWS S3 (Image Hosting)
- MongoDB Atlas (Cloud Database)
- Git & GitHub (Version Control)

---

## 📁 Folder Structure

```
trendify/
├── client/                # Frontend (React)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── context/ or redux/
│       ├── App.js
│       └── index.js
├── server/                # Backend (Node.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── .env
├── package.json
├── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trendify.git
cd trendify
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a .env file inside the server/ directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

This will run the React app on http://localhost:3000.

---

## 🔐 Environment Variables

For server/.env:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

For client/.env (optional):

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## 📦 API Routes Overview

### 🧑‍💼 Auth Routes
- POST /api/auth/register – User registration
- POST /api/auth/login – User/Admin login

### 🛍️ Product Routes
- GET /api/products – Get all products
- GET /api/products/:id – Get product by ID
- POST /api/products – Create product (Admin)
- PUT /api/products/:id – Update product (Admin)
- DELETE /api/products/:id – Delete product (Admin)

### 🛒 Cart & Order Routes
- POST /api/cart – Add to cart
- GET /api/cart/:userId – Get user cart
- POST /api/orders – Place order
- GET /api/orders/:userId – Get user orders

### 👨‍💼 Admin Routes
- GET /api/admin/dashboard – Dashboard summary
- GET /api/users – List all users
- DELETE /api/users/:id – Delete user

---

## 🖼️ Screenshots

Replace the URLs with actual screenshots once deployed.

- Home Page
- Product Details
- Cart
- Admin Dashboard

---

## 🚀 Deployment

You can deploy:

- Frontend: Netlify, Vercel
- Backend: Render, Railway
- Database: MongoDB Atlas
- Media: Cloudinary, AWS S3

---

## 📌 Future Enhancements

- 🔐 OTP-based Login/Signup
- 💳 Payment Gateway Integration (Stripe/Razorpay)
- 🌟 Product Ratings & Reviews
- 📝 Wishlist Support
- ✉️ Email Notifications
- 📊 Sales Analytics for Admin

---

## 📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute it.

---

## 🙋‍♂️ Author

**Nayan**
- 📧 Email: nayan1480.be22@chitkarauniversity.edu.in
- 🔗 GitHub: https://github.com/yourusername

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and share it!

**Trendify – Bringing Trends to Your Doorstep.**
