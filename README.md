# Ciudadanos 🧑‍🤝‍🧑🇻🇪

![Laravel 10](https://img.shields.io/badge/Laravel-10-red.svg)
![React 19.1](https://img.shields.io/badge/React-19.1-61DAFB.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791.svg)
![Responsive UI](https://img.shields.io/badge/Responsive-Yes-success.svg)
![Dark/Light Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-informational.svg)

> Web application for registering, querying, and updating citizens in a PostgreSQL database.  
> Originally developed for the Venezuelan Institute of Social Security (IVSS) using Oracle, this version has been adapted with a new structure for PostgreSQL.

---

## 📁 Project Structure

```bash
Ciudadanos/
├── Ciudadanos-API/       # Laravel 10 Backend
│   ├── app/              # Application logic
│   ├── config/           # Configuration files
│   └── routes/           # API route definitions
│
└── Frontend/             # React.js Frontend
    ├── public/           # Static assets
    ├── src/              # Source code
    └── package.json      # Dependencies
```

---

## ⚙️ Technologies Used

- **Laravel 10** – RESTful API for handling CRUD operations on citizens.
- **React.js 19.1** – Modern and fast UI for user interaction.
- **Tailwind CSS 4.1.7** – Styling with responsive support and dark/light theme.
- **PostgreSQL** – Robust and scalable database engine.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)  

---

## 🧑‍💻 Features

✅ Register new citizens  
✅ View citizen information  
✅ Update citizen information  
✅ Responsive interface with dark and light mode support  
✅ Full integration between frontend and backend via REST API  
✅ Rate Limiting to protect against abuse via request limits

---

## 📸 Screenshots

<p><em>Preview of the main screens of the application:</em></p>

<p><strong>📋 Home Page</strong></p>
<p align="center">
  <img src="./screenshots/home.jpg" alt="Home Page" width="80%">
</p>

<p><strong>➕ Citizen Registration</strong></p>
<p align="center">
  <img src="./screenshots/registro.jpg" alt="Citizen Registration" width="70%">
</p>

<p><strong>📄 Citizen Details</strong></p>
<p align="center">
  <img src="./screenshots/detalle.jpg" alt="Citizen Details" width="70%">
</p>

<p><strong>🔄 Update Citizen</strong></p>
<p align="center">
  <img src="./screenshots/actualizar.jpg" alt="Update Citizen" width="70%">
</p>

<p><strong>⛔ Rate Limiting Error</strong></p>
<p align="center">
  <img src="./screenshots/rate-limiting-error.jpg" alt="Rate Limiting Error" width="70%">
</p>

<p><strong>☀ Light Mode</strong></p>
<p align="center">
  <img src="./screenshots/home-light-mode.jpg" alt="Light Mode" width="80%">
</p>

---

## 🚀 Installation & Running

### 🔧 Backend (Laravel)

```bash
cd Ciudadanos/Ciudadanos-API
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 💻 Frontend (React.js)

```bash
cd Ciudadanos/Frontend
npm install
npm run dev
```

> Make sure the backend .env file is configured with your PostgreSQL database connection.

---

## 📡 API Endpoints

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| GET    | /api/ciudadanos      | Get all citizens |
| GET    | /api/ciudadanos/buscar | Search citizen by Nationality + ID Number |
| POST   | /api/ciudadanos      | Register a new citizen   |
| PATCH  | /api/ciudadanos/{ciudadano} | Update citizen  |

---

## 🧪 Testing

The system includes tests to verify endpoints and rate limiting:

```bash
php artisan test
```
Verified test cases:

✅ List citizens  
✅ Search citizen by ID number and nationality  
✅ Register new citizen  
✅ Update citizen  
✅ Request limit enforcement  
✅ Blocking after exceeding request limit  
✅ Reset after cooldown period  

---

## 📄 License

This project is a replica intended for testing and portfolio purposes.
It should not be used for commercial purposes without permission.

---

## 🙋‍♂️ Author

Developed by [William Villegas](https://www.linkedin.com/in/william-villegas-ab3b94215/)
