# Backend Test Eigen

A Node.js backend application built with Express.js and TypeScript for managing library book borrowing system.

## Requirements Met

- ✅ ExpressJS Framework with TypeScript
- ✅ Swagger API Documentation
- ✅ Database (SQLite with Prisma ORM)
- ✅ Entities: Member, Book
- ✅ Borrowing/Returning logic with business rules
- ✅ Unit Tests (Jest)

## Features

### Members
- List all members with their borrowed book count

### Books
- List all books with available stock (excluding borrowed ones)

### Borrowing
- Borrow up to 2 books per member
- Cannot borrow if under penalty
- Stock validation

### Returning
- Return borrowed books
- Penalty (3 days) if returned after 7 days

### Algorithm Challenge
- Reverse letters while keeping numeric suffixes fixed
- Find the longest word in a sentence
- Count how many times query words appear in an array
- Calculate the diagonal difference of an NxN matrix

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Deployment

This backend API can be deployed on hosting platforms such as Railway, Heroku, or Vercel.

### Railway

1. Push this repository to GitHub.
2. Create a new project in Railway.
3. Connect your GitHub repository.
4. Set the build command to:
   ```bash
   npm install
   npm run build
   ```
5. Set the start command to:
   ```bash
   npm start
   ```

### Heroku

1. Install the Heroku CLI and log in:
   ```bash
   heroku login
   ```
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Deploy the repository:
   ```bash
   git push heroku master
   ```
4. The app will use the `Procfile` included in this repository.

### Vercel

Vercel is designed for serverless deployments, but you can also deploy a Node.js backend with a custom server.

1. Install the Vercel CLI and log in:
   ```bash
   npm install -g vercel
   vercel login
   ```
2. Deploy the app:
   ```bash
   vercel
   ```
3. If needed, use a custom build command: `npm install && npm run build`.

### Note

GitHub Pages is only for static sites and is not suitable for this backend API.

## API Endpoints

- `GET /books` - Get all books
- `GET /members` - Get all members
- `POST /borrow` - Borrow a book (body: { memberCode, bookCode })
- `POST /return` - Return a book (body: { memberCode, bookCode })
- `GET /api-docs` - Swagger documentation

## Mock Data

### Books
- JK-45: Harry Potter
- SHR-1: A Study in Scarlet
- TW-11: Twilight
- HOB-83: The Hobbit
- NRN-7: The Lion, the Witch and the Wardrobe

### Members
- M001: Angga
- M002: Ferry
- M003: Putri

## Business Rules

- Members can borrow max 2 books
- Borrowed books are not available for others
- Penalty prevents borrowing for 3 days
- Penalty applied if book returned after 7 days