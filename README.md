# Project 5 – FavLinks Full Stack


# 1. Project Overview
This project is a small full stack CRUD application called “FavLinks”. It lets the user create, view, update, and delete a list of favorite website links. The app has:
- A React frontend (built with Vite)
- A Node.js + Express backend API
- A SQL database table to store the links
The goal is to show that I can connect a React client to an Express API and a database, and use environment variables to hide sensitive data.

# 2. Technologies Used
Frontend:
- React with Vite
- JavaScript (ES6+)
- CSS for basic styling

Backend:
- Node.js
- Express.js
- pg (PostgreSQL client for Node) – if deployed with Postgres
- dotenv for environment variables
- cors for cross-origin requests

Database:
- SQL database with a single table named favlinks
- Columns: id, name, url, description, created_at

Version Control:
- Git and GitHub

# 3. Project Structure (high level)
- /client  → React frontend
- /server  → Express backend and database code
- server/db.sql → SQL script to create the favlinks table
- .gitignore → ignores node_modules and all .env files
- README.md → main text readme in the repository

# 4. Features (CRUD)
The application supports full CRUD operations:
- Create: Add a new favorite link with name, URL, and optional description.
- Read: See all saved links in a table.
- Update: Edit an existing link (name, URL, or description).
- Delete: Remove a link from the list.

When the user fills in the form and submits, the frontend calls the Express API, which talks to the database and then sends back the updated data.

# 5. How to Run the Backend (server)
1. Open a terminal in the server folder:
   cd server
2. Install dependencies:
   npm install
3. Create a database in your SQL tool (example: favlinks_db).
4. Run the SQL file:
   - Open server/db.sql in your database tool and execute the script to create the favlinks table.
5. Create the .env file:
   - Copy .env.example to .env.
   - Set DATABASE_URL to your own database connection string.
   - Set PORT to 3000 (or another port if needed).
6. Start the server:
   npm run dev
   The API will run on http://localhost:3000.

# 6. How to Run the Frontend (client)
1. Open a new terminal in the client folder:
   cd client
2. Install dependencies:
   npm install
3. Create the .env file:
   - Copy .env.example to .env.
   - Make sure VITE_API_BASE_URL points to the backend API, for example:
     VITE_API_BASE_URL=http://localhost:3000/api
4. Start the React dev server:
   npm run dev
5. Open the URL printed in the terminal (usually http://localhost:5173) in a browser.

# 7. Environment Variables and Security
- The project uses .env files to store secrets, such as DATABASE_URL.
- The .env files are listed in .gitignore, so they are not pushed to GitHub.
- On a cloud platform, these values are configured in the dashboard instead of committing them to the repository.

# 8. Deployment Notes
This app can be deployed by:
- Hosting the backend on a Node-friendly platform (Render, Railway, Heroku, etc.).
- Hosting the database on a managed SQL/Postgres service.
- Hosting the frontend as a static site (Vercel, Netlify, or from the backend after building).

In deployment, the frontend’s VITE_API_BASE_URL must be set to the live backend URL, and the backend’s DATABASE_URL must point to the live database.

# 9. What I Learned
- How to create a simple API in Express and connect it to a SQL database.
- How to use React components, props, and hooks (useState, useEffect) to manage state and fetch data.
- How to perform CRUD operations across the full stack: frontend → backend → database.
- How to use .env and .gitignore to keep sensitive information out of GitHub.

