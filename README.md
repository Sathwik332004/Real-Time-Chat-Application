# Real-Time Chat Application (MERN Stack)

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![MERN](https://img.shields.io/badge/Stack-MERN-success) ![Socket.io](https://img.shields.io/badge/RealTime-Socket.io-orange)

A full-stack real-time chat application built using the **MERN** stack (MongoDB, Express, React, Node.js) and **Socket.io**. This application enables secure, instant one-to-one messaging with a modern, responsive UI.

**[🚀 View Live Demo](https://real-time-chat-application-rxkj.onrender.com)**

---

## 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/18aad685-9914-4c2f-8dea-662402976749" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1f0184f6-ef8d-49e6-a3f4-eaff64d12a63" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b49a8c6-847a-40e0-84e6-2d728831ac34" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1469bb4b-7e63-49d2-b951-70a7819784a3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3586cc6f-86a5-4ec3-8b55-9042a2413421" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/80808481-094d-4fc6-8b0c-3ea74e94c439" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9959a019-bb93-408f-8c8b-2c9e27d38322" />

---

## ✨ Features

### 🔌 Real-Time Communication
* **Instant Messaging:** Powered by **Socket.io** for low-latency communication.
* **Live User Status:** Real-time Online/Offline presence indicators.
* **Notifications:** Browser notifications, sound alerts, and unread message counters.

### 🔐 Authentication & Security
* **Secure Auth:** JWT (JSON Web Token) based authentication.
* **User Management:** Registration, Login, and **Password Reset via Email**.
* **Profile Management:** Update user details and upload profile avatars.

### 🎨 UI/UX Design
* **Modern Interface:** Built with **React** and styled using **TailwindCSS**.
* **Responsive:** Fully mobile-friendly design.
* **Chat Tools:** Emoji picker integration and intuitive conversation search.
* **Feedback:** Robust error handling and loading states for a seamless experience.

### ☁️ Infrastructure
* **Database:** Cloud-hosted MongoDB Atlas.
* **Deployment:** Production-ready hosting on Render.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js
* TailwindCSS (Styling)
* Context API / Redux (State Management)
* Socket.io-client

**Backend:**
* Node.js
* Express.js
* Socket.io (WebSockets)
* Nodemailer (Email Services)
* JsonWebToken (Auth)

**Database:**
* MongoDB (Atlas)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v14+)
* npm or yarn
* MongoDB URI

### 1. Clone the repository
```bash
git clone [https://github.com/Sathwik332004/Real-Time-Chat-Application.git](https://github.com/Sathwik332004/Real-Time-Chat-Application.git)
cd real-time-chat-app
```

### 2. Backend Setup
Navigate to the root directory (or server directory if separated) and install dependencies:

```bash
npm install
```

Create a .env file in the root directory and add the following:

Code snippet
```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email Configuration (for password reset)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

```
Start the backend server:

```bash
npm run server
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder (if applicable), and install dependencies:

```bash
cd client
npm install
```

Create a .env file in the client directory (if using Vite/Create-React-App):

Code snippet
```plaintext
VITE_API_URL=http://localhost:5000
```
# or REACT_APP_API_URL depending on your build tool

Start the frontend application:

```bash
npm start
```
---

### 🚀 Deployment

This project is deployed using Render.

Backend: Connect your GitHub repo to Render and set the Build Command to npm install and Start Command to node server.js (or your entry file). Add your Environment Variables in the Render dashboard.

Frontend: Deploy as a Static Site or separate Web Service depending on your structure.

---

### 🔮 Future Enhancements

[ ] Group Chat functionality.

[ ] File and image sharing in chats.

[ ] Read receipts (Double ticks).

[ ] Dark/Light mode toggle.

---

### 🤝 Contributing
Contributions are welcome!

Fork the project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

---

📞 Contact
If you have any questions, feel free to reach out!

LinkedIn: [LindedIn Profile](https://www.linkedin.com/in/sathwik-bairy-p-n-9ba1152b1)
Email: [Mail ID](sathwikn67@gmail.com)



