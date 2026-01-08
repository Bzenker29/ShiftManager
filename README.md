# ShiftManager

ShiftManager is a full-stack employee scheduling and availability management application built with React, Node.js, Express, and PostgreSQL.

====================
TECH STACK
====================

Frontend:

- React (Vite)
- Tailwind CSS
- DaisyUI
- FullCalendar

Backend:

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors

====================
VERSIONS USED
====================

Node.js v24.11.1  
React v5.1.0  
PostgreSQL / pgAdmin v18

====================
SETUP INSTRUCTIONS
====================

Install latest Node:
npm install npm@latest -g

Install Nodemon:
npm install -g nodemon

====================
CLONE REPOSITORY
====================

git clone https://github.com/Bzenker29/ShiftManager.git
cd ShiftManager

====================
GIT WORKFLOW
====================

Create a new branch:
git branch <branch-name>
git checkout <branch-name>

Merge to main after review:
git checkout main
git merge <branch-name>
git push origin main

Do NOT push directly to main.

====================
FRONTEND SETUP
====================

Create Vite app:
npm create vite@latest

Select:

- React
- JavaScript

Install dependencies:
cd frontend
npm install

Install Tailwind:
npm install tailwindcss @tailwindcss/vite

Install DaisyUI:
npm install -D daisyui@latest

Install FullCalendar:
npm install @fullcalendar/react @fullcalendar/timegrid @fullcalendar/daygrid

Run frontend:
npm run dev

====================
BACKEND SETUP
====================

cd backend
npm init -y

Install backend dependencies:
npm install express cors pg dotenv

In package.json, add:
"type": "module"

Run backend:
nodemon src/index.js

====================
DATABASE SETUP
====================

Install PostgreSQL and pgAdmin.

Create backend/.env file:

PG_USER=your_db_user
PG_HOST=localhost
PG_NAME=your_db_name
PG_PASSWORD=your_db_password
PG_PORT=5432

Do NOT commit .env files.

====================
API TESTING
====================

Postman is recommended for testing API routes and JSON responses.

====================
PROJECT STRUCTURE
====================

ShiftManager/
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ └── main.jsx
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── db.js
│ │ └── index.js
└── README.md

====================
FEATURES
====================

- Employee management
- Availability (unavailability) tracking
- Daily, weekly, and monthly calendar views
- REST API backend
- PostgreSQL database
- FullCalendar integration
