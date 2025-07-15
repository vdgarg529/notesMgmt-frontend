# 📝 AI Note-Taking App (React + FastAPI)

This is a mobile-first, modular monolith note-taking frontend app built with **React** and **Vite**, designed to work with a **FastAPI** backend. Users can register, log in, create notes using text or speech, and retrieve notes via natural language queries.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Register & Login)
- 🎙️ Voice Input via Web Speech API (mic auto-starts)
- 📝 Create & Save Notes (typed or spoken)
- 🔍 AI Query Search (RAG-powered)
- 📄 View AI responses + related notes
- ⚙️ Fully modular and maintainable architecture

---

## 📦 Tech Stack

- **Frontend**: React (with React Router, Web Speech API)
- **Backend**: FastAPI (assumed running on `localhost:8000`)
- **API communication**: REST + JWT Auth
- **Tooling**: Vite, ESBuild

---

## 🛠 Setup Instructions

### 1. Clone or Download the Code
```bash
git clone <repo-url>
cd your-app
```

### 2. Install Dependencies
```bash
npm install
npm install react-router-dom
```

### 3. Run the App
```bash
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

### 4. Backend Setup (Required)
Ensure your **FastAPI** backend is running locally at:
```
http://localhost:8000
```

---

## 🧪 Test Flow

1. Register a new user
2. Login → redirected to Home
3. Add a note using mic or manual input → click Save
4. Go back to Home → note appears at top
5. Click search → speak or type your query → see response + related notes

---

## 📌 Notes

- Web Speech API works only in **secure context** (localhost or HTTPS)
- This is a frontend-only repo. You’ll need the FastAPI backend to be active for full functionality
- Tested on modern mobile browsers (Chrome, Firefox)

---


