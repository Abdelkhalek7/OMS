

# Order Management System

This repository contains the backend implementation of an Order Management System (OMS) built with NestJS for an e-commerce mobile app. The system allows users to manage products, carts, orders, and more.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.
- **PostgreSQL**: An advanced open-source relational database.
- **Swagger**: API documentation and exploration tool.

## Features

- **User Management**: CRUD operations for users.
- **Product Management**: CRUD operations for products.
- **Cart Management**: Add, update, view, and remove products from the cart.
- **Order Management**: Create orders, view order history, update order status, apply coupon to order.
- **Coupon Management**: CRUD operations for coupons.


## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd order-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Database Setup

1. Create a PostgreSQL database for the application.

2. Set the database connection URL in the `.env` file:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

   Replace `username`, `password`, and `database_name` with your PostgreSQL credentials.

3. Run database migrations to create tables:

   ```bash
   npx prisma migrate dev
   ```

### Running the Application

To start the NestJS server:

```bash
npm run start
# or
yarn start
```

The server will start on `http://localhost:3000` by default.

### Testing

To run tests:

```bash
npm run test
# or
yarn test
```

### API Documentation

Swagger is integrated for API documentation. After starting the server, navigate to:

```
http://localhost:3000/api/
```

## Additional Notes

- **Environment Variables**: Use `.env` files for local development. For production, set environment variables directly.
- **Error Handling**: Centralized error handling is implemented to catch and format errors uniformly.