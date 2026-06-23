# Blog Platform

A full-stack blogging application where users can create, edit, delete posts and interact using comments.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Logout

### Blog Management
- Create Blog Posts
- View All Posts
- Edit Posts
- Delete Posts
- Search Posts
- Category Based Posts

### User Interaction
- Add Comments
- Like Posts
- User Profile Dashboard

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB


## Folder Structure


## How to Run

### Backend
cd backend

npm install

npm run dev


### Frontend
cd frontend

npm install

npm start


Frontend runs on:
http://localhost:3000
Backend runs on:
http://localhost:5000


## Environment Variables

Create `.env` inside backend:
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key