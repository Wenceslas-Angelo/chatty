# 💬 ChatApp - Realtime Messaging App 🔐⚡

Bienvenue sur **ChatApp**, une application de messagerie instantanée en temps réel construite avec la stack **MERN** (MongoDB, Express, React, Node.js) et alimentée par **Socket.io** pour les messages en live.  
Authentification sécurisée via **JWT**, upload d’image via **Cloudinary** 🚀

---

## 🧰 Technologies utilisées

- ⚛️ **React** + **Vite** – Frontend rapide et moderne
- 🌐 **Node.js** + **Express** – API REST robuste
- 💾 **MongoDB Atlas** – Base de données NoSQL
- 🔐 **JWT (JSON Web Token)** – Authentification sécurisée
- 📡 **Socket.io** – Communication en temps réel (WebSocket)
- ☁️ **Cloudinary** – Upload d’image dans le cloud
- 🎨 **Tailwind CSS** + **DaisyUI** – Design rapide et responsive

---

## 🖼️ Fonctionnalités

- ✅ Authentification (signup/login) avec JWT
- 🧑‍🤝‍🧑 Liste des utilisateurs connectés
- 💬 Envoi de messages texte et images
- ⚡ Réception des messages en temps réel via Socket.io
- 🌓 Mode sombre

---

## 🚀 Lancer le projet en local

### 🔧 Prérequis

- Node.js & pnpm installés
- MongoDB Atlas (ou instance locale)
- Cloudinary account

### 📦 Installer les dépendances

#### Backend

```bash
cd server
pnpm install
```

#### Frontend

```bash
cd client
pnpm install
```

### 🔑 Configurer les variables d’environnement

#### 📁 Backend: .env

```bash
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=ton_secret_de_fou
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

#### 📁 Frontend: .env

```bash
VITE_API_URL=http://localhost:3000
```

### ▶️ Lancer l’application

#### Backend

```bash
pnpm run dev
```

#### Frontend

```bash
pnpm run dev
```
