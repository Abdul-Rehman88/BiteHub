# 🍔 BiteHub

A modern food ordering web application built with React, Vite, and Firebase — delivering a seamless restaurant browsing and meal ordering experience.

🌐 **Live Demo:** [https://bitehub-9b0c0.web.app](https://bitehub-9b0c0.web.app)

---

## 📸 Preview

### 🏠 Landing Page
![BiteHub Landing Page](https://github.com/user-attachments/assets/09bb069d-97a4-4c5e-8483-30f9907501d6)

### 🖥️ Admin Dashboard
![BiteHub Admin Dashboard](https://github.com/user-attachments/assets/7fbe5800-127b-4002-8f3c-ccf36a09ae17)

---

## ✨ Features

**Customer Side**
- 🔐 User authentication (Login / Signup)
- 🍽️ Browse menu and food categories
- 🛒 Add items to cart and place orders
- 📅 Table reservation system

**Admin Dashboard**
- 📊 Live stats — Total Orders, Revenue, Reservations, Menu Items
- 🧾 Recent Orders table with status badges (Completed / Preparing / Canceled)
- 📋 Recent Reservations with guest count and special requests
- 🗂️ Menu, Orders, and Reservations management via sidebar

**General**
- 📦 Real-time data with Cloud Firestore
- 📱 Fully responsive design
- ⚡ Fast page loads with Vite

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | CSS / Tailwind |
| Backend & DB | Firebase Firestore |
| Auth | Firebase Authentication |
| Hosting | Firebase Hosting |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- A Firebase project

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bitehub.git
cd bitehub

# Install dependencies
npm install
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a project
2. Enable **Firestore Database** and **Authentication**
3. Copy your Firebase config and create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔒 Firestore Security Rules

The following rules are used in production — only authenticated users can read or write data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📁 Project Structure

```
bitehub/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── firebase/         # Firebase config & helpers
│   ├── App.jsx
│   └── main.jsx
├── .env
├── vite.config.js
└── package.json
```

---

## 🌐 Deployment

This project is deployed on **Firebase Hosting**. To redeploy:

```bash
npm run build
firebase deploy
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using React + Firebase
