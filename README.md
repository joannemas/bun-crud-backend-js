# Bun CRUD Backend JS

## Project Overview

This project is a web application built using Elysia and Bun. It provides a simple yet powerful framework for creating web applications with support for various features like user registration, authentication, and CRUD (Create, Read, Update, Delete) operations for Pokemon data.

## Installation

Before running the application, you need to install the required dependencies and set up your environment.

### Install Dependencies

` bun i`

### Set Up Environment Variables

Create a .env file in the project root directory and define the following variables:

````
MONGO_URI=<Your MongoDB URI> # MongoDB connection string

JWT_SECRET=<Your JWT Secret Key> # Secret key for JWT
````

## Getting Started

### Starting the Application

To start the application, use one of the following commands:

Production Mode:

`bun start`

Development Mode (with hot-reloading):

`bun run dev`

## Features

- Pokemon CRUD: This application provides a route for managing Pokemon data. You can create, read, update, and delete Pokemon entries.

- User Registration and Authentication: Users can register for an account and log in. Authentication is handled using JWT (JSON Web Tokens) for secure user sessions.


## Dependencies

This project relies on the following dependencies:

- Elysia: The Elysia framework provides the core functionality for creating web applications. It includes routing, middleware handling, and request/response processing.

- Bun: Bun is used for serving HTML, JavaScript, and other static files. It is used to serve the application's front-end.

- Mongoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB. It's used to interact with the MongoDB database and define the data schema.

- JWT (JSON Web Tokens): JSON Web Tokens are used for user authentication and session management. The JWT secret key should be kept secure.

- Swagger: Swagger is a tool for documenting APIs. It can be used to generate API documentation and test API endpoints.

- Cors: Cors (Cross-Origin Resource Sharing) is used to enable cross-origin requests, allowing the front-end to communicate with the back-end.


## Project Structure

```
project/
│
├── src/
│ └── auth
│ │ └── jwt.setup.ts
│ └── controllers
│ │ ├── pokemons.controller.ts
│ │ └── users.controller.ts
│ └── database
│ │ └── db.setup.ts
│ └── docs
│ │ └── docs.ts
│ └── models
│ │ ├── pokemon.schema.ts
│ │ └── user.schema.ts
│ └── public
│ │ ├── index.html
│ └─└──login.html
│ ├── index.ts
│ ├── log.js
├─└-─ script.js
│
├── .env
│
├── bun.lockb
│
├── package.json
│
├── README.md
│
└── tsconfig.json
```


## API Routes

This application provides several API routes for managing Pokemon and user data. Here's a brief overview of the available routes:

### Pokemon Routes

- `GET /pokemon`: Retrieves a list of all Pokemon.
- `GET /pokemon/:id`: Retrieves details for a specific Pokemon by ID.
- `POST /pokemon`: Creates a new Pokemon entry.
- `PUT /pokemon/:id`: Updates an existing Pokemon entry by ID.
- `DELETE /pokemon/:id`: Deletes a Pokemon entry by ID.

Available at [http://localhost:3000](http://localhost:3000) 

### User Routes

- `POST /users`: Registers a new user by providing a username, email, and password.
- `POST /login`: Logs in a user by providing a username and password. Returns a JWT token upon successful login.

Available at [http://localhost:3000/log](http://localhost:3000/log) 

### Swagger Documentation

The Swagger documentation for the API routes is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) when the application is running.