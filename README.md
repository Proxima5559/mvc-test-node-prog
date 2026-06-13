# Express.js Test Project

A minimalist, unopinionated boilerplate application built with **Express.js** and **Node.js**. This repository serves as a testing sandbox and features a fully configured environment for developing and validating RESTful APIs.

## 💻 Getting Started

Follow these step-by-step instructions to set up the application environment:


### 1. Install Dependencies
Install all required Node modules defined inside `package.json`:
```bash
npm install
```

### 3. Setup Environment Variables
Duplicate the example environment file and adapt it to your preferences:
```bash
cp .env.example .env
```
Open your newly created `.env` file and set your desired configurations:
```env
PORT=3000
NODE_ENV=development
```

---

## 🏃 Available Scripts

You can run the following automated scripts within the project root folder:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the server with live-reload enabled via `nodemon`. |
| `npm start` | Runs the server natively without automated reload mechanisms. |
| `npm test` | Executes the complete test suite using Jest. |


