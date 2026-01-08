# ShiftManager

ShiftManager is a full-stack employee scheduling and availability (unavailability) management application built with React, Node.js, Express, and PostgreSQL.

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- DaisyUI
- FullCalendar

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors

---

## Versions Used

- Node.js: v24.11.1
- React: v5.1.0
- PostgreSQL / pgAdmin: v18

---

## Setup Instructions

### Install Latest Node

```bash
npm install npm@latest -g
```

### Install Nodemon

```bash
npm install -g nodemon
```

---

## Clone Repository

```bash
git clone https://github.com/Bzenker29/ShiftManager.git
cd ShiftManager
```

---

## Git Workflow

Create a new branch:

```bash
git branch <branch-name>
git checkout <branch-name>
```

Merge to main after review:

```bash
git checkout main
git merge <branch-name>
git push origin main
```

Do NOT push directly to `main`.

---

## Frontend Setup

Create Vite app:

```bash
npm create vite@latest
```

Select:

- React
- JavaScript

Install dependencies:

```bash
cd frontend
npm install
```

Install Tailwind:

```bash
npm install tailwindcss @tailwindcss/vite
```

Install DaisyUI:

```bash
npm install -D daisyui@latest
```

Install FullCalendar:

```bash
npm install @fullcalendar/react @fullcalendar/timegrid @fullcalendar/daygrid
```

Run frontend:

```bash
npm run dev
```

---

## Backend Setup

```bash
cd backend
npm init -y
```

Install backend dependencies:

```bash
npm install express cors pg dotenv
```

In `package.json`, add:

```json
"type": "module"
```

Run backend:

```bash
nodemon src/index.js
```

---

## Database Setup

Install PostgreSQL and pgAdmin.

Create a `.env` file in `backend/`:

```env
PG_USER=your_db_user
PG_HOST=localhost
PG_NAME=your_db_name
PG_PASSWORD=your_db_password
PG_PORT=5432
```

Do NOT commit `.env` files.

---

## API Testing

Postman is recommended for testing API routes and inspecting JSON responses.

---

## Project Structure

```text
ShiftManager/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── main.jsx
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── db.js
│   │   └── index.js
└── README.md
```

---

## Features

- Employee management
- Availability / unavailability tracking
- Daily, weekly, and monthly calendar views
- REST API backend
- PostgreSQL database
- FullCalendar integration
