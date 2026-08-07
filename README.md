# 🔐 MERN Stack Authentication System

A production-grade, enterprise-ready full-stack authentication system built with the **MERN** stack (MongoDB, Express, React 19, Node.js). 

Featuring **Dual-Instance Axios Architecture**, **Silent Token Refresh with Request Queueing**, **HTTP-Only Cookies**, **Role-Based Protected Routes**, **Global Error Boundaries**, and **Toast Notifications**.

---

## ✨ Features

- **🔐 Dual-Token Authentication**: Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d) stored securely in `httpOnly`, `sameSite` cookies.
- **🔄 Dual Axios Instance Architecture**: Segregates public requests (`publicApi`) from authenticated requests (`privateApi`) to eliminate recursive interceptor loops.
- **⚡ Concurrent Request Queueing**: Queues simultaneous 401 requests during token refresh and retries them automatically upon successful rotation.
- **📡 Decoupled Auth Event Bus**: Broadcasts `SESSION_EXPIRED` events to React state directly from API interceptors without circular dependency issues.
- **🛡️ Route Guarding & Layouts**: Role-based access control with `ProtectedRoute`, `PublicRoute`, and authenticated `DashboardLayout`.
- **💥 Resilient Error Handling**: React Error Boundaries (`AppErrorBoundary` + `ErrorFallback`), centralized Express `ApiError`, and client-side `handleApiError` normalization.
- **🔔 Toast Notification System**: Centralized UI feedback via `react-toastify`.
- **📋 Form Validation**: Client-side validation hooks and schemas with real-time feedback.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite**
- **React Router DOM v7**
- **Tailwind CSS v4**
- **Axios** (Dual instance: Public & Private with response interceptors)
- **react-error-boundary**
- **React Toastify**

### Backend
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose**
- **JSON Web Tokens (jsonwebtoken)**
- **bcryptjs** (Salted password hashing)
- **cookie-parser** & **cors**

---

## 📁 Project Structure

```text
mern-auth-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and cookie configurations
│   │   ├── controllers/     # Auth controllers (register, login, logout, refresh, me)
│   │   ├── helpers/         # User sanitization and token generation helpers
│   │   ├── middleware/      # Auth protection, role authorization, error & 404 handlers
│   │   ├── models/          # Mongoose User model with password hashing & token methods
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # ApiError, ApiResponse, and asyncHandler utilities
│   │   ├── app.js           # Express app setup and CORS middleware configuration
│   │   └── server.js        # Server bootstrap and DB connection
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/             # publicApi, privateApi, interceptors, and auth.api
│   │   ├── components/      # UI components, form fields, layout (Navbar, UserMenu), ErrorFallback
│   │   ├── constants/       # Route paths and constants
│   │   ├── context/         # AuthContext & AuthProvider with event bus listeners
│   │   ├── hooks/           # useAuth and custom useForm validation hooks
│   │   ├── layouts/         # MainLayout and DashboardLayout
│   │   ├── pages/           # Home, Login, Register, Profile, NotFound, Unauthorized, ServerError
│   │   ├── routes/          # AppRoutes, ProtectedRoute, PublicRoute, and AppErrorBoundary
│   │   ├── services/        # Auth API service callers
│   │   ├── utils/           # authEvents, errorHandler, apiError, and toast wrappers
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
| `GET` | `/api/v1/auth/me` | Fetch current authenticated user profile | Yes |

---

## 🔒 Security Best Practices

- **Dual-Instance Axios Isolation**: Public endpoints (login/register/refresh) never trigger interceptors, eliminating infinite recursion bugs.
- **Password Hashing**: Salted hashes generated with `bcryptjs` using automatic pre-save hooks on the User schema.
- **HTTP-Only Cookies**: Access and refresh tokens are stored in `httpOnly` cookies to protect against Cross-Site Scripting (XSS).
- **SameSite Cookie Policies**: Set to `lax` in development and `none` (with `secure: true`) in production for cross-site cookie isolation.
- **User Sanitization**: Sensitive properties (`password`, `refreshToken`) are stripped before returning user data.