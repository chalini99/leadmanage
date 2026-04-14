# 🚀 LeadFlow - Lead Management System

A full-stack Lead Management System built with **React, Node.js, Express, and MongoDB**.
This application helps users manage leads efficiently with a modern dashboard and clean UI.

---

## ✨ Features

* ➕ Add, Edit, Delete Leads
* 📊 Dashboard with analytics
* 🏷️ Lead status tracking (New, Contacted, Closed)
* 📁 Export leads to CSV
* 🔐 Simple authentication (Login/Logout)
* 🎨 Modern UI with responsive design

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/leadflow.git
cd leadflow
```

---

### 🔹 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 🔹 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

### Backend (.env)

| Variable   | Description                   |
| ---------- | ----------------------------- |
| PORT       | Server port (default: 5000)   |
| MONGO_URI  | MongoDB connection string     |
| JWT_SECRET | Secret key for authentication |

---

## 🏗️ Project Architecture

```
leadflow/
│
├── backend/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth middleware
│   └── server.js      # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/     # Dashboard, Leads, Login
│   │   ├── services/  # API calls (Axios)
│   │   └── components/# Reusable UI components
│
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/leads     | Get all leads   |
| POST   | /api/leads     | Create new lead |
| PUT    | /api/leads/:id | Update lead     |
| DELETE | /api/leads/:id | Delete lead     |

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---



## 📌 Notes

This project demonstrates full-stack development including:

* UI/UX design
* API integration
* Database handling
* Deployment-ready architecture

---
