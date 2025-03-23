# Password Manager (MERN Stack)

A secure and simple password manager built using the **MERN stack** (MongoDB, Express, React, Node.js). This application allows users to store, retrieve, and manage their passwords securely.

---

## Features

- **Add Passwords**: Store site credentials (site, username, password).
- **View Passwords**: Retrieve stored passwords.
- **Delete Passwords**: Remove credentials when no longer needed.
- **RESTful API**: Backend built with **Express & MongoDB**.

---

## Tech Stack 

### Frontend (React)
- React.js
- React Hooks (useEffect, useState)
- Fetch API

### Backend (Node.js & Express)
- Node.js
- Express.js
- MongoDB (via Mongoose)

---

## Installation & Setup 

### 1️⃣ Clone the repository
```bash
 git clone https://github.com/yourusername/password-manager.git
 cd password-manager
```

### 2️⃣ Backend Setup (Node.js & Express)
```bash
 cd backend  # Navigate to backend directory
 npm install  # Install dependencies
```
#### Create a `.env` file in the `backend` directory and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=9000
```
#### Start Backend Server:
```bash
 npm start
```

### 3️⃣ Frontend Setup (React)
```bash
 cd ../frontend  # Navigate to frontend directory
 npm install  # Install dependencies
 npm start    # Start the React app
```

---

## API Endpoints 🌐

### **1. Add Password**
**Endpoint:** `POST /add`

**Body:**
```json
{
  "site": "example.com",
  "username": "john_doe",
  "password": "mypassword"
}
```
**Response:**
```json
{
  "success": true,
  "msg": "Data submitted"
}
```

### **2. Retrieve Passwords**
**Endpoint:** `GET /get`

**Response:**
```json
[
  {
    "_id": "12345",
    "site": "example.com",
    "username": "john_doe",
    "password": "hashedpassword"
  }
]
```

### **3. Delete Password**
**Endpoint:** `DELETE /del/:id`

**Response:**
```json
{
  "success": true,
  "msg": "Data deleted"
}
```

---




