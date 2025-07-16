# Castallapp Frontend

Web frontend for Castallapp. Built with React + Vite + Firebase Authentication.

## Setup

1. **Environment Configuration:**
   ```bash
   cp sample.env .env
   ```
   Update `.env` with your backend URL if different from `http://localhost:3000`

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Backend:**
   Make sure the backend server is running on `http://localhost:3000`

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Authentication

This app uses Firebase authentication. See [AUTHENTICATION.md](./AUTHENTICATION.md) for detailed information about the auth system.

### Login Credentials

Use any valid Firebase account credentials. The backend will automatically create a user record on first login.

