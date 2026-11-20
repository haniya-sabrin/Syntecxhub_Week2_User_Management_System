# User Management System

A secure REST API built using Node.js, Express.js, MongoDB and Mongoose.

## Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected API Routes
- Get User Profile
- Update User Details
- Delete User Account
- Input Validation
- Email Normalization
- User Ownership Protection
- Secure Password Handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- Postman

## Installation

1. Clone the repository.

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory.

4. Add the following environment variables:

   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

5. Start the server:

   node --watch server.js

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### User Management

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/users/me | Get own profile |
| GET | /api/users/:id | Get own user details |
| PUT | /api/users/:id | Update own details |
| DELETE | /api/users/:id | Delete own account |

Protected routes require a JWT Bearer Token.

## Security

- Passwords are hashed before storage.
- JWT authentication protects user routes.
- Users cannot access or modify another user's account.
- Passwords are excluded from profile responses.
- Deleted accounts cannot use old JWT tokens.

## Developer

Haniya Sabrin A.

B.Tech Information Technology