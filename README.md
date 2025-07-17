# 🎓 Student Monitoring System

A full-stack, role-based student monitoring system built with **React**, **Node.js**, **Express**, and **MongoDB**. It enables admin and staff users to manage students, courses, enrollments, attendance, and more in a clean, modular architecture.

---

## 🚀 Features

### 👥 User Authentication & Roles
- Register/login with form validations
- Roles: `admin` and `staff`
- Admin can manage users
- Staff can manage only students, courses, etc.

### 🎓 Student Management
- Add, update, delete students
- Search and filter by ID or name
- View detailed student profiles

### 📚 Course & Enrollment
- Add/manage courses
- Enroll students into courses
- View course-wise enrolled students

### 🕒 Attendance Tracking
- Mark attendance per course
- View attendance by student or course

### 🔐 Secure Auth Flow
- Passwords hashed using bcrypt
- Protected routes based on roles
- Session/token-based auth (JWT)

---

## 🧠 Tech Stack

### 💻 Frontend
- React
- React Router
- Context API (Auth State)
- Tailwind CSS (optional) + Custom CSS

### 🛠 Backend
- Node.js + Express
- MongoDB + Mongoose
- Bcrypt (for hashing passwords)
- JWT (for auth tokens)

---

## 🗂 Folder Structure

### 📁 `/client` (Frontend)
```
client/
├── src/
│   ├── api/             # API calls
│   ├── pages/           # Page-level components (Login, Register, Dashboard)
│   ├── components/      # Reusable UI components (Form, Card, Navbar)
│   ├── features/        # Domain modules (students, users, courses)
│   ├── context/         # Auth & Global state
│   ├── styles/          # CSS files
│   └── App.jsx          # App Router
```

### 📁 `/server` (Backend)
```
server/
├── controllers/         # Handle request/response
├── services/            # Business logic
├── repositories/        # DB interaction (Mongoose)
├── models/              # Mongoose schemas
├── routes/              # Class-based Express routers
├── middlewares/         # Auth, validation, error handlers
├── config/              # DB connection, env setup
└── server.js            # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/student-monitoring-system.git
cd student-monitoring-system
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 3. Setup `.env`

Create `.env` file in `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 4. Run the project

#### Start Backend
```bash
cd server
npm start
```

#### Start Frontend
```bash
cd client
npm start
```

---

## 🔑 Default Roles & Usage

- Admins can:
  - Manage users (add, delete, view)
  - Manage all other modules
- Staff can:
  - Only manage students, enrollments, courses, attendance

---

## 📸 Screenshots

> *(Add images of login screen, dashboard, student list, etc. if needed)*
Home Page:
> <img width="1365" height="760" alt="image" src="https://github.com/user-attachments/assets/955009b6-338c-4655-ac16-da4060399105" />
Login & Resgiter Page
> 
| <img width="400" alt="image" src="https://github.com/user-attachments/assets/19085530-9d34-47a5-8dd3-c7cf7a2d3b58" /> | <img width="400" alt="image" src="https://github.com/user-attachments/assets/fecc7b31-1c2f-4ac1-8027-fdf8c1f4721c" /> |
Dashboard:
> <img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/bc33a329-1a77-4e28-a4c4-c3ad5da40ab1" />
Courses:
> <img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/2441188d-7c68-4a8d-a6bf-8270300968fa" />
Admin View:
> <img width="1364" height="749" alt="image" src="https://github.com/user-attachments/assets/5052a493-56a5-4cd2-83aa-3d2691e5fddb" />



---

## 📦 Deployment (Optional)

> If deployed, include the URL  
🌐 [Live Demo](https://your-deployed-url.com)

---

## 👨‍💻 Author

**Pavan**  
📧 [pavankumar80890@gmail.com]  
🌐 https://www.linkedin.com/in/pavan-kumar-bb4581249/

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
