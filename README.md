# 🔐 Browser-Based Secure Terminal Platform (Shellify)

This project is a full-stack web application that provides users with a secure, real-time terminal interface in the browser. Each terminal runs inside a Docker container, with resource-managed autoscaling on AWS EC2. The terminal supports multiple programming languages like Python, C++, Node.js, and more.

---

## 🌐 Features

- 🔒 **Secure Shell Access** via browser using Docker with `rbash`
- ⚙️ **Autoscaling EC2 instances** based on container load:
  - Reuses existing EC2 instances up to 10 containers
  - Automatically launches new instances when needed
  - Terminates idle instances when no containers are running
- 🧠 **Language selection** creates containers with pre-installed compilers (Python, C++, Node.js, etc.)
- 💬 **Live WebSocket communication** between frontend and backend
- 🧾 Tracks containers per instance using **MongoDB Atlas**

---

## 🧱 Tech Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS
- Framer Motion

### 🛠 Backend
- Node.js
- Express
- Socket.io
- SSH2 (for EC2 communication)
- Docker API

### ☁️ DevOps & Infrastructure
- AWS EC2 (auto-managed)
- Docker
- MongoDB Atlas
- Secure Linux shell with `rbash`

---

## 🧑‍💻 Author

**Rohit Jagtap**  
Full Stack Developer | Cloud & DevOps Enthusiast  


