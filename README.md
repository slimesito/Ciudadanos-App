# Ciudadanos 🧑‍🤝‍🧑🇻🇪

![Laravel 10](https://img.shields.io/badge/Laravel-10-red.svg)
![React 19.1](https://img.shields.io/badge/React-19.1-61DAFB.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791.svg)
![Responsive UI](https://img.shields.io/badge/Responsive-Yes-success.svg)
![Dark/Light Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-informational.svg)

> Aplicación web para el registro, consulta y actualización de Ciudadanos en una base de datos PostgreSQL.  
> Originalmente desarrollada para el Instituto Venezolano de los Seguros Sociales IVSS en Oracle, esta versión ha sido adaptada con una nueva estructura para PostgreSQL.

---

## 📁 Estructura del Proyecto

```bash
Ciudadanos/
├── Ciudadanos-API/       # Backend en Laravel 10
│   ├── app/              # Lógica de la aplicación
│   ├── config/           # Configuraciones
│   └── routes/           # Definición de endpoints
│
└── Frontend/             # Frontend en React.js
    ├── public/           # Assets estáticos
    ├── src/              # Código fuente
    └── package.json      # Dependencias
```

---

## ⚙️ Tecnologías Usadas

- **Laravel 10** – API RESTful para manejar operaciones CRUD de ciudadanos.
- **React.js 19.1** – Interfaz moderna y rápida para interacción del usuario.
- **Tailwind CSS 4.1.7** – Estilización con soporte responsive y modo oscuro/claro.
- **PostgreSQL** – Motor de base de datos robusto y escalable.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)  

---

## 🧑‍💻 Funcionalidades

✅ Registrar nuevos ciudadanos  
✅ Consultar listado de ciudadanos  
✅ Actualizar datos de un ciudadano  
✅ Interfaz responsive con adaptación a tema oscuro y claro  
✅ Integración full entre Frontend y Backend mediante API REST
✅ Rate Limiting para limitar las consultas y operaciones dentro de la Aplicación

---

## 📸 Capturas de Pantalla

<p><em>Vista previa de las principales pantallas de la aplicación:</em></p>

<!-- Página de Inicio -->
<p><strong>📋 Página de Inicio</strong></p>
<p align="center">
  <img src="./screenshots/home.jpg" alt="Página de Inicio" width="80%">
</p>

<!-- Registro de Ciudadano -->
<p><strong>➕ Registro de Ciudadano</strong></p>
<p align="center">
  <img src="./screenshots/registro.jpg" alt="Formulario de Registro" width="70%">
</p>

<!-- Detalle de Ciudadano -->
<p><strong>📄 Detalle de Ciudadano</strong></p>
<p align="center">
  <img src="./screenshots/detalle.jpg" alt="Detalle de Ciudadano" width="70%">
</p>

<!-- Actualizar Ciudadano -->
<p><strong>🔄 Actualizar Ciudadano</strong></p>
<p align="center">
  <img src="./screenshots/actualizar.jpg" alt="Formulario de Actualización" width="70%">
</p>

<!-- Rate Limiting Error -->
<p><strong>⛔ Error de Rate Limiting</strong></p>
<p align="center">
  <img src="./screenshots/rate-limiting-error.jpg" alt="Rate Limiting Error" width="70%">
</p>

<!-- Modo Claro -->
<p><strong>🛠️ Modo Claro</strong></p>
<p align="center">
  <img src="./screenshots/home-light-mode.jpg" alt="Modo Claro" width="80%">
</p>

---

## 🚀 Instalación y Ejecución

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

> Asegúrate de que el archivo `.env` del backend tenga configurada la conexión a tu base de datos PostgreSQL.

---

## 📡 API Endpoints

| Método | Ruta                 | Descripción              |
|--------|----------------------|--------------------------|
| GET    | /api/ciudadanos      | Obtener todos los ciudadanos |
| GET    | /api/ciudadanos/buscar | Buscar ciudadano por Nacionalidad + Cédula |
| POST   | /api/ciudadanos      | Registrar ciudadano   |
| PATCH  | /api/ciudadanos/{ciudadano} | Actualizar ciudadano  |

---

## 🧪 Pruebas

> *(Si implementaste pruebas, aquí puedes detallar cómo ejecutarlas. Si no, te recomiendo agregarlas con Pest o PHPUnit para Laravel, y Vitest o Jest para React.)*

---

## 📄 Licencia

Este proyecto es una réplica con fines de prueba y de portafolio. No debe utilizarse con fines comerciales sin autorización.

---

## 🙋‍♂️ Autor

Desarrollado por [William Villegas](https://www.linkedin.com/in/william-villegas-ab3b94215/)
