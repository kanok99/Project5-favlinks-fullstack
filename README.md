# Project 5 – FavLinks Full Stack App (Postgres, Express, React, Node)

This project is a small **CRUD full stack app** that connects:

- React (Vite) frontend
- Express + Node backend
- PostgreSQL database

It implements the **FavLinks** app from previous projects and satisfies the specs:

- React app with components, props, and hooks (`useState`, `useEffect`)
- Express API with full CRUD endpoints
- PostgreSQL database connection using environment variables
- `.env` and `.gitignore` used to hide sensitive data
- Ready to deploy to a cloud platform (Render / Railway / Heroku / etc.)

---

## 1. Project Structure

```text
project5-favlinks-fullstack/
  README.md
  .gitignore
  server/
    package.json
    index.js
    src/
      db.js
      routes/
        favlinks.js
    db.sql
    .env.example
  client/
    index.html
    vite.config.js
    package.json
    .env.example
    src/
      main.jsx
      App.jsx
      components/
        FavLinksForm.jsx
        FavLinksTable.jsx
```

---

## 2. Set Up PostgreSQL

1. Make sure PostgreSQL is installed and running.
2. Create a database (example):

   ```sql
   CREATE DATABASE favlinks_db;
   ```

3. Run the SQL in `server/db.sql` inside that database to create the `favlinks` table.

---

## 3. Backend (Express + Postgres)

1. Go into the `server` folder:

   ```bash
   cd server
   npm install
   ```

2. Copy the example env file and add **your own** database URL:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/favlinks_db
   PORT=3000
   DB_SSL=false
   ```

3. Start the backend API:

   ```bash
   npm run dev
   ```

   The API will run by default on `http://localhost:3000`.

   Test quickly in browser or Postman:

   - `GET http://localhost:3000/api/links`

---

## 4. Frontend (React + Vite)

1. Open a new terminal at the project root, then:

   ```bash
   cd client
   npm install
   ```

2. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

   The default value is:

   ```bash
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. Start the React app:

   ```bash
   npm run dev
   ```

4. Open the URL printed by Vite (usually `http://localhost:5173`) and you should see the FavLinks app.

You can:

- **Create** new links
- **Read** (list) all links
- **Update** an existing link
- **Delete** a link

All operations are persisted in PostgreSQL.

---

## 5. Scripts

### Backend

From `server/`:

- `npm run dev` – start server with nodemon for development
- `npm start` – start server with node (production style)

### Frontend

From `client/`:

- `npm run dev` – start Vite dev server
- `npm run build` – build production bundle
- `npm run preview` – preview production build

---

## 6. Deployment Notes (for Cloud Platforms)

You can deploy using Render, Railway, Heroku, etc.:

### Backend

- Deploy the `server` folder as a Node app.
- Add environment variables in the cloud dashboard:
  - `DATABASE_URL` – connection string to your managed Postgres instance
  - `PORT` – often provided by the platform, so use `process.env.PORT`
  - `DB_SSL=true` (most cloud Postgres require SSL)

### Frontend

- Either:
  - Deploy the `client` as a static site (Vercel/Netlify/etc.) and point
    `VITE_API_BASE_URL` to your **deployed backend URL**, _or_
  - Serve the built React app from Express (advanced, optional).

Make sure you **never commit `.env` files**. They are already in `.gitignore`.

---

## 7. What to Submit

For your class submission, you can:

- Push this project to GitHub (React + Express + Postgres code).
- Include:
  - `README.md`
  - `server/` folder
  - `client/` folder
  - `db.sql`
- Provide the **live URL** for your deployed app if required by your instructor.

This folder is ready to zip and submit as your **Project 5**.
