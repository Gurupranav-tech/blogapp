# Task Management API

REST API built with nestjs and typescript

# Build Instructions

- Must have nodejs installed
- If you are using npm

```bash
cd server
npm i
```

- If you are using yarn

```bash
cd server
yarn
```

- If you are using pnpm

```bash
cd server
pnpm i
```

# To run

- Before starting the server you have to setup the database, in this build sqlite database is used for simplicity

```bash
npx prisma migrate dev
```

- Once the database is created then you can proceed with starting up the server

- If you are using npm

```bash
npm run start:dev
```

- If you are using yarn

```bash
yarn start:dev
```

- If you are using pnpm

```bash
pnpm run start:dev
```

# Build Details

- As of now the backend is fully complete and supports authentication with email and password and create, delete, update, get operations for the todos
- All the api endpoints are available at http://localhost:3000/api/ once the server is running
- I intened this build to be a fullstack app with reactjs and typescript for the frontend, but due to lack of time only the backend is complete and the frontend only supports authentication and nothing more.
- To setup the frontend follow the instructions given below

# Frontend

- To start the frontend run the following commands. If you are using a different packagae manager use the equivalend commands of the below mentioned commands
- From the root directory

```bash
cd client
npm i
npm run dev
```

- This should start the client server in different port at localhost. The frontend is currently capable of authenticating users. CRUD operations for todos for the frontend is still under development.
- Once the CRUD operations for TODO is complete in the frontend also, this will be a fullstack deployable app.
