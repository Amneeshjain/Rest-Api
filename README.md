# Rest-Api

A modern REST API boilerplate built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This project provides a clean and scalable structure for building secure backend applications with JWT authentication and common middleware.

## ✨ Features

- TypeScript support
- Express.js server
- MongoDB with Mongoose
- JWT Authentication
- User Registration & Login
- Protected Routes Middleware
- Rate Limiting
- CORS Configuration
- Winston Logger
- Validation Error Handling
- Prettier & ESLint Configuration
- Nodemon for Development

## 📂 Project Structure

```text
src/
├── @types/
├── config/
├── controllers/
│   └── auth/
├── lib/
├── middlewares/
├── models/
├── routes/
├── utils/
└── server.ts
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amneeshjain/Rest-Api.git
cd Rest-Api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Or copy the example file:

```bash
cp .env.example .env
```

### 4. Start the development server

```bash
npm run dev
```

## 📜 Available Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start development server   |
| `npm run build`  | Compile TypeScript         |
| `npm start`      | Run compiled application   |
| `npm run lint`   | Run ESLint                 |
| `npm run format` | Format code using Prettier |

## 🔐 Authentication Endpoints

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Logout

```http
POST /api/auth/logout
```

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Winston
- Express Rate Limit
- ESLint
- Prettier

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📄 License

This project is licensed under the MIT License.
