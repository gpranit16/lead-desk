# LeadDesk Pro - Production Backend API

LeadDesk Pro is a high-performance, production-grade Lead Management SaaS backend built with Node.js, Express, MongoDB Atlas, and Mongoose following strict MVC architecture and ES Module standard.

---

## 🚀 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas via Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Dotenv
- **Logging**: Morgan

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection handler
│   ├── controllers/
│   │   ├── auth.controller.js    # Auth controller (Login)
│   │   └── lead.controller.js    # Lead management & stats controllers
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT authorization middleware
│   │   └── error.middleware.js   # Centralized error & 404 handlers
│   ├── models/
│   │   ├── User.js               # Admin User Mongoose schema
│   │   └── Lead.js               # Lead Mongoose schema (with soft delete)
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoint definitions
│   │   └── lead.routes.js        # Public & protected lead endpoints
│   ├── services/
│   │   ├── auth.service.js       # Auth business logic
│   │   └── lead.service.js       # Lead CRUD & analytics services
│   ├── utils/
│   │   ├── apiResponse.js        # Standardized API response formatters
│   │   ├── asyncHandler.js       # Async error handling wrapper
│   │   └── seedAdmin.js          # CLI tool to seed initial admin user
│   ├── validators/
│   │   ├── auth.validator.js     # Auth request validation rules
│   │   ├── lead.validator.js     # Lead request & parameter validators
│   │   └── validate.js           # express-validator middleware
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Entry point & DB bootstrap
├── .env                          # Local environment variables
├── .env.example                  # Template environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies & scripts
└── README.md                     # Documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://guptapranit34_db_user:yyDiGR1unIv1ZSF5@cluster0.wpkyubv.mongodb.net/leaddesk_pro?retryWrites=true&w=majority
JWT_SECRET=leaddesk_pro_super_secret_jwt_key_987654321
NODE_ENV=development
```

---

## 🛠️ Installation & Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Seed Initial Admin User**:
   Since there is no public registration endpoint, seed the initial admin account directly into MongoDB Atlas:
   ```bash
   npm run seed
   ```
   *Default Admin Credentials:*
   - **Email**: `admin@leaddesk.pro`
   - **Password**: `Admin@123456`

4. **Start Server**:
   - Development mode (with live reload):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

---

## 🔒 Authentication Flow

1. Admin authenticates via `POST /api/auth/login` with email and password.
2. Server validates credentials using `bcrypt.compare` and issues a signed JWT token valid for 30 days.
3. For protected admin endpoints (`/api/leads*`), pass the JWT token in the request header:
   ```http
   Authorization: Bearer <YOUR_JWT_TOKEN>
   ```

---

## 🗄️ Database Schemas

### 1. User Schema
| Field     | Type     | Options                              |
|-----------|----------|--------------------------------------|
| `name`    | String   | Required, trim                       |
| `email`   | String   | Required, unique, lowercase, trim    |
| `password`| String   | Required, select: false              |
| `createdAt`| Date    | Auto timestamp                       |
| `updatedAt`| Date    | Auto timestamp                       |

### 2. Lead Schema
| Field     | Type     | Options                                      |
|-----------|----------|----------------------------------------------|
| `name`    | String   | Required, trim                               |
| `email`   | String   | Required, lowercase, trim                    |
| `budget`  | Number   | Required, min: 0                             |
| `message` | String   | Optional, trim, default: `""`                |
| `status`  | String   | Enum (`New`, `Contacted`, `Closed`), default: `New` |
| `isDeleted`| Boolean | Default: `false`, indexed                    |
| `createdAt`| Date    | Auto timestamp                               |
| `updatedAt`| Date    | Auto timestamp                               |

---

## 📡 API Endpoints Documentation

All responses follow standard JSON structures:

**Success Response**:
```json
{
  "success": true,
  "message": "Operation successful description",
  "data": {}
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error description",
  "error": {}
}
```

---

### 🟢 Public Endpoints

#### 1. Submit a New Lead
- **Endpoint**: `POST /api/leads`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Pranit Gupta",
    "email": "pranit@example.com",
    "budget": 5000,
    "message": "Interested in enterprise plan"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Lead submitted successfully",
    "data": {
      "_id": "66a123456789abcdef012345",
      "name": "Pranit Gupta",
      "email": "pranit@example.com",
      "budget": 5000,
      "message": "Interested in enterprise plan",
      "status": "New",
      "isDeleted": false,
      "createdAt": "2026-07-24T21:00:00.000Z",
      "updatedAt": "2026-07-24T21:00:00.000Z"
    }
  }
  ```

---

### 🔴 Admin Endpoints (Protected by JWT)

#### 2. Admin Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "admin@leaddesk.pro",
    "password": "Admin@123456"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "66a987654321fedcba543210",
        "name": "Super Admin",
        "email": "admin@leaddesk.pro"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### 3. Dashboard Statistics
- **Endpoint**: `GET /api/leads/stats`
- **Access**: Protected (`Bearer <JWT>`)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Lead statistics retrieved successfully",
    "data": {
      "totalLeads": 42,
      "newLeads": 15,
      "contactedLeads": 20,
      "closedLeads": 7
    }
  }
  ```

#### 4. List Leads (Search, Filter, Pagination, Sorting)
- **Endpoint**: `GET /api/leads`
- **Access**: Protected (`Bearer <JWT>`)
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `status`: Filter by status (`New`, `Contacted`, `Closed`)
  - `search`: Case-insensitive search on `name` or `email` (e.g., `?search=pranit`)
- **Example**: `GET /api/leads?search=pranit&status=New&page=1&limit=10`
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Leads retrieved successfully",
    "data": {
      "leads": [
        {
          "_id": "66a123456789abcdef012345",
          "name": "Pranit Gupta",
          "email": "pranit@example.com",
          "budget": 5000,
          "message": "Interested in enterprise plan",
          "status": "New",
          "isDeleted": false,
          "createdAt": "2026-07-24T21:00:00.000Z"
        }
      ],
      "pagination": {
        "total": 1,
        "page": 1,
        "limit": 10,
        "totalPages": 1
      }
    }
  }
  ```

#### 5. Get Single Lead
- **Endpoint**: `GET /api/leads/:id`
- **Access**: Protected (`Bearer <JWT>`)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Lead details retrieved successfully",
    "data": {
      "_id": "66a123456789abcdef012345",
      "name": "Pranit Gupta",
      "email": "pranit@example.com",
      "budget": 5000,
      "status": "New"
    }
  }
  ```

#### 6. Update Lead Status
- **Endpoint**: `PATCH /api/leads/:id/status`
- **Access**: Protected (`Bearer <JWT>`)
- **Request Body**:
  ```json
  {
    "status": "Contacted"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Lead status updated to Contacted",
    "data": {
      "_id": "66a123456789abcdef012345",
      "status": "Contacted"
    }
  }
  ```

#### 7. Soft Delete Lead
- **Endpoint**: `DELETE /api/leads/:id`
- **Access**: Protected (`Bearer <JWT>`)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Lead deleted successfully",
    "data": {
      "id": "66a123456789abcdef012345",
      "isDeleted": true
    }
  }
  ```

---

## 🔮 Future Improvements

1. **Role-Based Access Control (RBAC)**: Support multiple admin roles (Super Admin, Sales Rep, Support Manager).
2. **Email Notifications**: Integrate SendGrid or AWS SES for real-time automated emails when a new lead is submitted.
3. **Activity Logs / Audit Trail**: Log lead status modifications and notes added by sales representatives.
4. **Export Capabilities**: CSV/Excel export endpoint for filtered leads.
5. **Rate Limiting**: Add express-rate-limit to public endpoint `/api/leads` to protect against spam submissions.
