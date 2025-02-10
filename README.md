# BlogApp

## Overview

BlogApp is a web application for creating, editing, and sharing blog posts. Developed as a part of the GDSC Induction Task, this project showcases skills in Node.js, NestJS, React.js and TypeScript

## Features

- Create, edit, and delete blog posts
- User authentication and authorization
- Responsive design for various devices
- Commenting system for blog posts
- Search functionality

## Technologies Used

- **Frontend:**

  - HTML
  - CSS
  - Typescript
  - React

- **Backend:**

  - Node.js
  - NestJS
  - Typescript

- **Database:**
  - SQLite

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Gurupranav-tech/blogapp.git
   cd blogapp
   ```

2. Set up the env variables for the client

   ```.env
   VITE_SERVER="link"
   ```

3. Set up the env variables for the server

   ```.env
   DATABASE_URL="file"
   SECRET="blahblahblah"
   ```

4. Set up the backend:

   ```sh
   cd backend
   npm install
   npm run start:dev
   ```

5. Set up the frontend:
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

### Usage

1. Access the application by navigating to `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.
2. Register a new user or log in with an existing account.
3. Create, edit, delete, and view blog posts.
4. Comment on blog posts and explore the search functionality.
