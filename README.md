# SalesCRM

A modern, full-stack **Lead Management & Customer Relationship Management (CRM)** platform built for small sales teams. It enables organizations to capture, assign, manage, and track leads efficiently through a complete sales pipeline while providing secure role-based access, activity tracking, and collaboration features.

---

# 🚀 Live Demo

### 🌐 Frontend
https://lead-management-system-gbt5.vercel.app

### ⚙️ Backend API
https://lead-management-system-2joc.onrender.com

---

# 🔑 Demo Credentials

### Admin

**Email**

```
admin@test.com
```

**Password**

```
password123
```

> Admin has complete access to user management, lead assignment, pipeline management, and activity history.

---

# 📸 Screenshots

## Dashboard

> <img width="1365" height="604" alt="image" src="https://github.com/user-attachments/assets/6565bdf2-7a1f-421c-99cb-57913a92f3a7" />

---

## Lead Management

> <img width="1360" height="602" alt="image" src="https://github.com/user-attachments/assets/b0d80328-f21b-4cc1-928e-08b02d1bfb8f" />


---

## Public Lead Capture

> <img width="1363" height="601" alt="image" src="https://github.com/user-attachments/assets/14b4a782-4e8e-4387-9e89-73657a91d80b" />


---

## Login Page

> <img width="1359" height="608" alt="image" src="https://github.com/user-attachments/assets/76284295-655f-43b2-aa62-53b4b6e7aa96" />


---

## Team Management

> <img width="1365" height="605" alt="image" src="https://github.com/user-attachments/assets/19cc03ff-59d3-4910-bf77-f37a5d7cec45" />



---

# ✨ Features

## Authentication & Authorization

- JWT Authentication
- Secure password hashing using bcrypt
- Role-Based Access Control (Admin & Member)
- Protected Routes
- Secure API Middleware
- Token Verification

---

## Lead Management

- Public Lead Capture Form
- Complete Lead Lifecycle
- Lead Assignment
- Status Pipeline
- Lead Notes
- Activity Timeline
- Search Leads
- Filter Leads
- Pagination
- Sorting

---

## Lead Pipeline

```
New
   ↓
Contacted
   ↓
Qualified
   ↓
Proposal Sent
   ↓
Won
```

or

```
Lost
```

---

## Team Collaboration

- Assign Leads
- Timestamped Notes
- Activity Tracking
- User Management
- Dashboard Analytics

---

## Security

- JWT Authentication
- Password Hashing
- Role Authorization
- Environment Variables
- Input Validation
- Centralized Error Handling
- Protected API Routes

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS
- JavaScript
- Axios
- React Hook Form
- Lucide React
- date-fns

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- express-validator

---

## Testing

- Jest
- Supertest

---

## Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

---

# 🏗 Architecture

The backend follows a clean **MVC Architecture**.

```
Client
      │
      ▼
Next.js Frontend
      │
      ▼
Express REST API
      │
 ┌─────────────┐
 │ Controllers │
 ├─────────────┤
 │  Services   │
 ├─────────────┤
 │ Middleware  │
 ├─────────────┤
 │   Models    │
 └─────────────┘
      │
      ▼
MongoDB Atlas
```

Business logic is separated from route handlers, improving maintainability, scalability, and testability.

---

# 📚 API Documentation

## Base URL

```
https://lead-management-system-2joc.onrender.com/api
```

---

## Authentication

### POST `/auth/register`

Register a new user.

---

### POST `/auth/login`

Authenticate a user.

---

### GET `/auth/me`

Return authenticated user details.

---

## Leads

### GET `/leads`

Supports

- Pagination
- Search
- Filtering
- Sorting

---

### POST `/leads`

Create a Lead.

---

### PUT `/leads/:id`

Update Lead.

---

### PUT `/leads/:id/status`

Update Lead Status.

---

### DELETE `/leads/:id`

Delete Lead (**Admin Only**)

---

## Users

### GET `/users`

Admin Only

---

### POST `/users`

Admin Only

---

### DELETE `/users/:id`

Admin Only

---

## Public Capture

### POST `/capture`

Capture public lead without authentication.

---

## Activities

### GET `/activities`

Retrieve activity history.

---

# 📂 Project Structure

```
lead-management-system/

│
├── backend/
│
│── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── frontend/
│
│── app/
│── components/
│── context/
│── hooks/
│── lib/
│── pages/
│── public/
│── utils/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Kartikeya-09/lead-management-system.git
```

```
cd lead-management-system
```

---

## Backend

```
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

Run

```
npm run dev
```

---

## Frontend

```
cd frontend
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=https://lead-management-system-2joc.onrender.com/api
```

Run

```
npm run dev
```

---

# 🧪 Testing

Run backend tests

```
cd backend

npm test
```

Current coverage includes

- Authentication
- Authorization
- Lead CRUD
- Role Permissions
- Validation
- Error Handling

---

# 🚀 Deployment

## Backend

Hosted on **Render**

https://lead-management-system-2joc.onrender.com

---

## Frontend

Hosted on **Vercel**

https://lead-management-system-gbt5.vercel.app

---

## Database

MongoDB Atlas

---

# 📈 Future Improvements

- Email Notifications
- File Uploads
- Advanced Analytics Dashboard
- CSV Import & Export
- Real-time Notifications
- Team Performance Reports
- Lead Tags
- Dark / Light Theme Toggle

---

# 👨‍💻 Author

**Kartikeya Kaushal**

GitHub

https://github.com/Kartikeya-09

---

# 🙏 Acknowledgements

Built using

- Next.js
- Express.js
- MongoDB
- Tailwind CSS
- JWT Authentication

---

# 📩 Support

If you encounter any issue, please open an Issue in this repository.

---

## 📄 Assessment Note

This project was developed as part of a **Full Stack Software Engineering Assessment**.

It demonstrates:

- Production-ready REST APIs
- JWT Authentication
- Role-Based Authorization
- Modern SaaS UI
- MVC Architecture
- MongoDB Data Modeling
- Automated Testing
- Full-stack Deployment using Vercel and Render

---
