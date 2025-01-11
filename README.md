# Says Blog Website 2025

A backend for a blogging platform built with Node.js, TypeScript, and MongoDB. This project supports secure user authentication, role-based access control, and a public API for reading blogs with search, sort, and filter functionalities. It also provides users and admins with different sets of permissions and CRUD capabilities for managing blogs.

## Live Deployment
**URL**: [[https://says-blog-website-node.vercel.app/]]

## Features
- **User Roles**:
  - Admin can block users and delete any blog.
  - Users can register, log in, and perform CRUD operations on their own blogs.
- **Authentication & Authorization**:
  - JWT-based secure login.
  - Role differentiation for admin and user functionalities.
- **Blog Management**:
  - Users can create, update, and delete their own blogs.
  - Admins can delete any blog and block any user.
- **Public Blog API**:
  - Search, filter, and sort blogs.
  - View author details for blogs.
- **Error Handling**:
  - Comprehensive and consistent error responses.
  - Handles Zod validation errors, authentication, and authorization issues.
- **Environment Configuration**:
  - Environment variables securely managed via dotenv.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: dotenv

## Installation

1. **Clone the repository:**:
   ```bash
   git clone https://github.com/your-username/says-blog-website-2025.git
2. **Navigate to the project directory:**:
   ```bash
   cd says-blog-website-2025
3. **Install dependencies:**:
   ```bash
   npm install
4. **Set up environment variables:**:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
5. **Install dependencies:**:
   ```bash
   npm run build
6. **Run the application:**:
   ```bash
   npm run start:dev    //development mode
   npm run start:prod    //production mode
## Admin Credentials
- **Email**: shipon@gmail.com
- **Password**: 123456
   
