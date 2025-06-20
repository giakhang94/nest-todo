# Task Management App

A full-stack task management application with web. Built with modern technologies and designed for real-time collaboration, intuitive UI, and role-based access control.

# Important note

To ensure safety and better version control, I initially worked on a private draft repository where I managed issues and committed code incrementally.
However, due to time constraints, the final submitted project is a copied version from that draft repo (I didn’t have time to clean and push a new version — that's a stupid decision).

If you’d like to review the original commit history, please accept the invitation to that private repository.
I’ve sent the git repo through my submission email

---

## Project Overview

This project is a task management system supporting:

- User registration and authentication (sign up, login, logout)
- Users can create, update, and delete their own tasks
- Role-based access (Admin/User)
- Realtime search with debounce
- Inline editing
- Status-based task grouping and update
- Theme toggling (Dark/Light)
- Responsive UI (Web-first, mobile-adaptive)

---

## Setup & Run Instructions

### Backend

> Built with NestJS, TypeORM, Postgres

1. Clone the repo: https://github.com/ZigvyCorp/zigvy-interview-homework

2. install packages:

```bash
  npm install
```

3. Set up environment:

```bash
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USERNAME=test_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=your_port
JWT_SECRET=your_secret
JWT_EXP=1
```

4. Crate connect to your postgres db

5. run

```bash
npm run start:dev
```

---

### Web Frontend

> Built with Vite, React, React Query, TailwindCSS, Shadcn UI

1. Navigate to `client/`:

   ```bash
   cd ../client
   ```

2. Setup:

   ```bash
   npm install
   ```

3. Start dev server:

   ```bash
   npm run dev
   ```

---

### 📱 Mobile

> React Native version is under development and not included in this release.

---

## Design Decisions & Trade-offs

- Instead of toggling task status with a select box, I used **stepwise status display (Todo → In Progress → Done)** for intuitive interaction. Users simply click to advance status.
- Editing is done directly on the task card via a `FlexibleInput` component that switches between `<p>` and `<input>`, allowing seamless inline editing.
- **Only admins** can promote others to admin or delete tasks globally.
- Implemented **realtime search with debounce (800ms)** to enhance performance and user experience.
- **Drag-and-drop not yet implemented**, but planned as next improvement.
- Includes **theme toggling** using `shadcn/ui` components.
- Due to time constraints, the **task modal form was assisted by AI** for initial structure, then refined manually.
- After submitting this test, I'll continue to research for CI/CD, websocket subject to apply to this project

---

## API Docs

The project is documented using Swagger.

- [Swagger UI available at ](http://localhost:3000/api)[`/docs`](http://localhost:3000/api)

---

## Screenshots

### Web App

[video demo](https://youtu.be/LA6JMi0If9A)

---

## Tech Stack

- **Backend**: NestJS, TypeORM, Postgres, Passport, Swagger
- **Frontend**: React, React Query, TailwindCSS, Shadcn UI, Typescript
- **Auth**: JWT (Role-based)
- **UI/UX**: Realtime search, Debounce, Inline editing, Dark/Light Theme

---

## Author

Nguyen Gia Khang – [Portfolio](https://portfolio-woad-two-34.vercel.app/)

---
