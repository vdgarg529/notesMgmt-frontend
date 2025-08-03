# 📝 Notes Management Frontend

[![Vercel](https://vercelbadge.vercel.app/api/vdgarg529/notesMgmt-frontend)](https://notesai-phi.vercel.app/)
[![React](https://img.shields.io/badge/built%20with-React-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/built%20with-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Hugging Face](https://img.shields.io/badge/powered%20by-Hugging%20Face-fcc72b)](https://huggingface.co/)
[![Gemini API](https://img.shields.io/badge/uses-Gemini%20API-4285F4)](https://ai.google.dev/)
[![ChromaDB](https://img.shields.io/badge/vector%20store-ChromaDB-6e40c9)](https://www.trychroma.com/)
[![SQLite](https://img.shields.io/badge/database-SQLite-003B57)](https://www.sqlite.org/)


This is the **frontend** for the Notes Management App — a modern, AI-powered note-taking web application. It works with a FastAPI backend to provide secure login, note creation, semantic search, and intelligent summaries.

> 🔗 [Backend Repository](https://github.com/vdgarg529/notesMgmt-backend)  
> 🚀 **Live Frontend**: [https://notesai-phi.vercel.app](https://notesai-phi.vercel.app)

---

## ✨ Features

- 🔐 JWT-based authentication (login/logout)
- 🧠 AI-based summarization using Gemini API
- 📚 Semantic search with ChromaDB embeddings
- 📄 Create, view, and manage notes
- 📜 View previous query history
- 📌 Expand/collapse notes with clean UI
- 🖥️ Responsive design with TailwindCSS + Vite

---

## 🧱 Tech Stack

| Tool         | Purpose                          |
|--------------|----------------------------------|
| **React**    | Frontend framework               |
| **Vite**     | Lightning-fast bundler           |
| **Tailwind** | Utility-first CSS styling        |
| **TypeScript** | Type-safe development           |
| **Axios**    | HTTP requests                    |
| **Zustand**  | Lightweight state management     |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vdgarg529/notesMgmt-frontend.git
cd notesMgmt-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a .env file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```
Replace with your backend's base URL if different.


### 4. Start Development Server
```bash
npm run dev
```
Now open your browser at http://localhost:5173

---



## 📁 Project Structure
```arduino
notesMgmt-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
└── vite.config.ts
```

---

## 🔐 Authentication Flow
JWT is issued upon login and stored in localStorage
Token is included in all authenticated API requests
Logout clears token and resets local state

---

## 🧠 AI & Embedding Features
🔍 Semantic search powered by ChromaDB embeddings
🧠 Gemini API used for generating note summaries
⚙️ These features are served by the backend, UI presented here

---
## 👤 Author
Vardan Garg
GitHub: @vdgarg529

Harsh Shrivastava
GitHub: @HK-Srivastava
---
## 📷 Screenshots
![Login Page](screenshots/login.png)
![Notes View](screenshots/notes.png)

