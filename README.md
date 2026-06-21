# Signup File Demo

A very small Next.js demo project for learning deployment basics such as EC2, SSH, Nginx, and domain-to-IP setup.

The app has one home page with a signup form. When a user signs up with name, email, and password, the backend writes the signup record into a server-side file:

```txt
server-data/users.jsonl
```

No database is used.

> This is a learning/demo project. It hashes passwords before saving them, but you should still not use this as a production authentication system.

## Tech

- Next.js App Router
- TypeScript
- One API route: `app/api/signup/route.ts`
- File storage using Node.js `fs/promises`

## Project structure

```txt
signup-file-demo/
  app/
    api/
      signup/
        route.ts
    globals.css
    layout.tsx
    page.tsx
  server-data/
    .gitkeep
  .gitignore
  next-env.d.ts
  next.config.ts
  package.json
  README.md
  tsconfig.json
```

## Run locally

### 1. Install Node.js

Use Node.js 20 or newer.

Check your version:

```bash
node -v
npm -v
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

### 4. Test the signup form

Submit the form from the browser.

Then check the saved file:

```bash
cat server-data/users.jsonl
```

Each signup is stored as one JSON line, like this:

```json
{"id":"...","name":"Bhupesh","email":"bhupesh@example.com","passwordHash":"scrypt:...","createdAt":"2026-06-21T00:00:00.000Z"}
```

## Production-style local run

Build the app:

```bash
npm run build
```

Start it:

```bash
npm run start
```

Open:

```txt
http://localhost:3000
```

## Push to GitHub

### 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial signup file demo"
```

### 2. Create an empty GitHub repository

Create a new repo on GitHub, for example:

```txt
signup-file-demo
```

Do not add README, `.gitignore`, or license on GitHub because this project already has files locally.

### 3. Connect local repo to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/signup-file-demo.git
git push -u origin main
```

## Notes for EC2 later

When you later run this on EC2, the file will be created relative to the project folder:

```txt
server-data/users.jsonl
```

Make sure the Linux user running the Node.js process has write permission to that folder.

The `.gitignore` file excludes `server-data/users.jsonl`, so test signup data is not pushed to GitHub.
