# 🔐 MERN Stack Authentication System

A secure, production-ready full-stack authentication system built with the **MERN** stack (MongoDB, Express, React, Node.js), featuring JWT-based authentication with **Refresh Token Rotation**, **HTTP-Only Cookies**, **Route Protection**, **Custom Form Validation**, and **Toast Notifications**.

---

## ✨ Features

- **🔐 Dual Token Authentication**: Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d) stored securely in `httpOnly`, `sameSite` cookies.
- **🔄 Refresh Token Rotation**: Implements token rotation on every refresh request to prevent replay attacks.
- **🛡️ Protected Routes**: Client-side route guarding using custom React `ProtectedRoute` wrappers.
- **📋 Form Validation**: Client-side validation hooks and schemas with real-time field-level error feedback.
- **🔔 Toast Notifications**: Centralized toast notification system powered by `react-toastify`.
- **⚡ Modern UI**: Built with React 19, Vite, and Tailwind CSS.
- **🛑 Robust Error Handling**: Centralized error middleware with custom `ApiError` and standardized `ApiResponse` structures.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite**
- **React Router DOM v7**
- **Tailwind CSS v4**
- **Axios** (with credentials support)
- **React Toastify**

### Backend
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose**
- **JSON Web Tokens (jsonwebtoken)**
- **bcryptjs** (Password hashing)
- **cookie-parser** & **cors**

---

## 📁 Project Structure

```text
mern-auth-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and cookie configurations
│   │   ├── controllers/     # Authentication controllers (register, login, logout, etc.)
│   │   ├── helpers/         # User sanitization and token generation helpers
│   │   ├── middleware/      # Auth protection, authorization, error & 404 handlers
│   │   ├── models/          # Mongoose User model with password hashing & token methods
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # ApiError, ApiResponse, and asyncHandler utilities
│   │   ├── app.js           # Express app setup and middleware configuration
│   │   └── server.js        # Server bootstrap and DB connection
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance configured with base URL & credentials
│   │   ├── components/      # Common UI components, protected routes, and form fields
│   │   ├── constants/       # Route paths and constants
│   │   ├── context/         # AuthContext and AuthProvider
│   │   ├── hooks/           # useAuth and custom useForm hooks
│   │   ├── layouts/         # Main application layouts
│   │   ├── pages/           # Home, Login, Register, Profile, and NotFound pages
│   │   ├── routes/          # App router configuration
│   │   ├── services/        # Auth API service callers
│   │   ├── utils/           # Toast notification wrappers and error formatters
│   │   ├── validators/      # Form validation schemas
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas connection string)

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env
```

Configure your `backend/.env`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/auth_system
NODE_ENV=development
CLIENT_URL=http://localhost:5173

ACCESS_TOKEN_SECRET=your_jwt_access_token_secret_here
ACCESS_TOKEN_EXPIRES=15m

REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret_here
REFRESH_TOKEN_EXPIRES=7d
```

Start the backend development server:
```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env
```

Configure your `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Start the frontend development server:
```bash
npm run dev
```

The client will be running at `http://localhost:5173`.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user | No |
| `POST` | `/api/v1/auth/login` | Login user & issue tokens | No |
| `POST` | `/api/v1/auth/logout` | Invalidate refresh token & clear cookies | Yes |
| `POST` | `/api/v1/auth/refresh-token` | Rotate and issue new access & refresh tokens | No (Cookie) |
| `GET` | `/api/v1/auth/me` | Fetch current authenticated user | Yes |

---

## 🔒 Security Best Practices

- **Password Hashing**: Salted hashes generated with `bcryptjs` using automatic pre-save hooks on the User schema.
- **HTTP-Only Cookies**: Access and refresh tokens are stored in `httpOnly` cookies to protect against Cross-Site Scripting (XSS).
- **SameSite Cookie Policies**: Set to `lax` in development and `none` (with `secure: true`) in production for cross-site cookie isolation.
- **User Sanitization**: Sensitive properties (`password`, `refreshToken`) are stripped before returning user data.